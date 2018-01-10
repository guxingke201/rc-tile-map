import { Children, PropTypes } from 'react'
import { pick, forEach } from 'lodash'
require('../BMapLib/InfoBox')
import MapComponent from '../MapComponent'
import layer from '../propTypes/layer'
import map from '../propTypes/map'
import { size } from '../propTypes/index'

export default class InfoBox extends MapComponent {
  static defaultProps = {
    enableAutoPan: true,
    align: window.INFOBOX_AT_TOP,
    show: true,
    contentEvents: {}
  }
  static propTypes = {
    children: PropTypes.node,
    offset: size,
    boxClass: PropTypes.string,
    boxStyle: PropTypes.object,
    closeIconMargin: PropTypes.string,
    closeIconUrl: PropTypes.string,
    enableAutoPan: PropTypes.bool,
    align: PropTypes.oneOf([window.INFOBOX_AT_TOP, window.INFOBOX_AT_BOTTOM]),
    show: PropTypes.bool,
    contentEvents: PropTypes.object
  }

  static contextTypes = {
    map: map,
    markerInstance: layer
  }
  createComponentInstance (props) {
    const instance = new BMapLib.InfoBox(
      this.context.map,
      this.getHtmlDomByReactDom(props.children),
      pick(props, [
        'offset',
        'boxClass',
        'boxStyle',
        'closeIconMargin',
        'closeIconUrl',
        'enableAutoPan',
        'align'
      ])
    )
    if (!props.show) {
      instance.hide()
    }
    return instance
  }

  updateComponentInstance (fromProps, toProps) {
    this.updatePropsByBoolFun('show', 'hide', fromProps.show, toProps.show)
    this.updatePropsByBoolFun(
      'enableAutoPan',
      'disableAutoPan',
      fromProps.enableAutoPan,
      toProps.enableAutoPan
    )
  }

  componentWillMount () {
    super.componentWillMount()
    this.componentInstance = this.createComponentInstance(this.props)
    if (this.props.setComponentInstance) {
      this.props.setComponentInstance(this.componentInstance)
    }
  }

  componentDidMount () {
    const { position } = this.props
    const { map, markerInstance } = this.context
    const el = this.componentInstance
    if (markerInstance) {
      // Attach to container component
      markerInstance.addEventListener('click', () => {
        this.componentInstance.open(markerInstance)
        const dom = this.getHtmlDomByReactDom(this.props.children)
        forEach(this.props.contentEvents, (evtFun, evtName) => {
          const domNow =
            evtName.indexOf('.') > 0
              ? this.getElementsByClassName(dom, evtName.split('.')[0])[0]
              : dom
          let evtNameNow =
            evtName.indexOf('.') > 0 ? evtName.split('.')[1] : evtName
          if (domNow.addEventListener) {
            domNow.addEventListener(evtNameNow, evt => {
              evtFun(evt, markerInstance, this.componentInstance)
            })
          } else if (domNow.attachEvent) {
            domNow.attachEvent('on' + evtNameNow, evt => {
              evtFun(evt, markerInstance, this.componentInstance)
            })
          }
        })
        this.componentInstance.setContent(dom)
      })
    }
  }

  componentDidUpdate (prevProps) {
    this.updateComponentInstance(prevProps, this.props)
    if (this.props.show) {
      const oldContent = this.getHtmlDomByReactDom(prevProps.children).innerText
      const newContent = this.getHtmlDomByReactDom(this.props.children)
        .innerText
      if (oldContent !== newContent) {
        this.componentInstance.setContent(
          this.getHtmlDomByReactDom(this.props.children)
        )
      }
    }
  }

  componentWillUnmount () {
    this.componentInstance.close()
    super.componentWillUnmount()
  }

  render () {
    return null
  }
}
