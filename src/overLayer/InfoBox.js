import { Children, PropTypes } from 'react'
import { forEach } from 'lodash'
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
    offset: window.BMap && new BMap.Size(0, 15),
    boxClass: 'infoBox',
    boxStyle: {},
    closeIconMargin: '2px',
    closeIconUrl: '//cdncs.101.com/v0.1/static/fish/image/close.png',
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
    const instance = new BMapLib.InfoBox(this.context.map, null, {
      ...this.getOptions(props)
    })
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
        this.bindContentEvents(
          this.props.contentEvents,
          dom,
          markerInstance,
          this.componentInstance
        )
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
        const dom = this.getHtmlDomByReactDom(this.props.children)
        this.bindContentEvents(
          this.props.contentEvents,
          dom,
          this.context.markerInstance,
          this.componentInstance
        )
        this.componentInstance.setContent(dom)
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
