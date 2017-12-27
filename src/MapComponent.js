import { clone, forEach, keys, reduce, isString, isEqual } from 'lodash'
import { Component } from 'react'
import { render } from 'react-dom'
export const EVENTS_RE = /^on(.+)$/i

export default class MapComponent extends Component {
  _mapEvents
  componentInstance

  constructor (props, context) {
    super(props, context)
    this._mapEvents = {}
  }

  componentWillMount () {
    this._mapEvents = this.extractEvents(this.props)
  }

  componentDidMount () {
    this.bindEvents(this._mapEvents, {})
  }

  componentWillReceiveProps (nextProps) {
    const next = this.extractEvents(nextProps)
    this._mapEvents = this.bindEvents(next, this._mapEvents)
  }

  componentWillUnmount () {
    const el = this.componentInstance
    if (!el) return

    forEach(this._mapEvents, (cb, ev) => {
      el.removeEventListener(ev, cb)
    })
  }

  extractEvents (props) {
    return reduce(
      keys(props),
      (res, prop) => {
        if (EVENTS_RE.test(prop)) {
          const key = prop.replace(EVENTS_RE, (match, p) => {
            return p.substr(0, 1).toLowerCase() + p.substr(1, p.length - 1)
          })
          if (props[prop] != null) {
            res[key] = props[prop]
          }
        }
        return res
      },
      {}
    )
  }

  bindEvents (next, prev) {
    const el = this.componentInstance
    if (el == null || el.addEventListener == null) return {}

    const diff = clone(prev)
    forEach(prev, (cb, ev) => {
      if (!next[ev] || cb !== next[ev]) {
        delete diff[ev]
        el.removeEventListener(ev, cb)
      }
    })

    forEach(next, (cb, ev) => {
      if (!prev[ev] || cb !== prev[ev]) {
        diff[ev] = cb
        el.addEventListener(ev, cb)
      }
    })

    return diff
  }

  fireEvent (type, data) {
    const el = this.componentInstance
    if (el) el.dispatchEvent(type, data)
  }

  getOptions (props) {
    const pane = props.pane == null ? this.context.pane : props.pane
    return pane ? { ...props, pane } : props
  }
  getHtmlDomByReactDom (reactDom) {
    if (isString(reactDom)) {
      return reactDom
    } else {
      var section = document.createElement('section')
      render(reactDom, section)
      return section
    }
  }
  updatePropsBySetFun (funcName, fromProp, toProp) {
    if (!isEqual(fromProp, toProp)) {
      return this.componentInstance[funcName](toProp)
    }
  }
  updatePropsByBoolFun (funcNameTrue, funcNameFalse, fromProp, toProp) {
    if (fromProp !== toProp) {
      if (toProp === true) {
        this.componentInstance[funcNameTrue]()
      } else {
        this.componentInstance[funcNameFalse]()
      }
    }
  }
}
