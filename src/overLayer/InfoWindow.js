import { PropTypes } from 'react'
import { isEqual } from 'lodash'
import MapComponent from '../MapComponent'
import layer from '../propTypes/layer'
import map from '../propTypes/map'
import { point, size } from '../propTypes/index'

export default class InfoWindow extends MapComponent {
  static defaultProps = {
    width: 0,
    height: 0,
    enableAutoPan: true,
    enableCloseOnClick: true,
    show: true,
    contentEvents: {}
  }
  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
    height: PropTypes.number,
    maxWidth: PropTypes.number,
    offset: size,
    title: PropTypes.string,
    enableAutoPan: PropTypes.bool,
    enableCloseOnClick: PropTypes.bool,
    position: point,
    show: PropTypes.bool,
    contentEvents: PropTypes.object
  }

  static contextTypes = {
    map: map,
    markerInstance: layer
  }
  createComponentInstance (props) {
    const instance = new window.BMap.InfoWindow(
      this.getHtmlDomByReactDom(props.children),
      this.getOptions(props)
    )
    if (!props.show) {
      instance.hide()
    }
    return instance
  }

  updateComponentInstance (fromProps, toProps) {
    this.updatePropsByBoolFun('show', 'hide', fromProps.show, toProps.show)
    this.updatePropsBySetFun('setTitle', fromProps.title, toProps.title)
    this.updatePropsBySetFun('setWidth', fromProps.width, toProps.width)
    this.updatePropsBySetFun('setHeight', fromProps.height, toProps.height)
    this.updatePropsByBoolFun(
      'enableAutoPan',
      'disableAutoPan',
      fromProps.enableAutoPan,
      toProps.enableAutoPan
    )
    this.updatePropsByBoolFun(
      'enableCloseOnClick',
      'disableCloseOnClick',
      fromProps.enableCloseOnClick,
      toProps.enableCloseOnClick
    )
  }

  componentWillMount () {
    super.componentWillMount()
    this.componentInstance = this.createComponentInstance(this.props)
    if (this.props.setComponentInstance) {
      this.props.setComponentInstance(this.componentInstance)
    }
  }
  onClickMarker = () => {
    const { markerInstance } = this.context
    markerInstance.openInfoWindow(this.componentInstance)
    const dom = this.getHtmlDomByReactDom(this.props.children)
    this.bindContentEvents(
      this.props.contentEvents,
      dom,
      markerInstance,
      this.componentInstance
    )
    this.componentInstance.setContent(dom)
  }
  componentDidMount () {
    const { position } = this.props
    const { map, markerInstance } = this.context
    const el = this.componentInstance
    if (markerInstance) {
      // Attach to container component
      markerInstance.addEventListener('click', this.onClickMarker)
    } else {
      // Attach to a Map
      if (position) {
        map.openInfoWindow(el, position)
      }
    }
  }

  componentDidUpdate (prevProps) {
    this.updateComponentInstance(prevProps, this.props)
    if (
      this.props.position &&
      !isEqual(prevProps.position, this.props.position)
    ) {
      this.context.map.openInfoWindow(
        this.componentInstance,
        this.props.position
      )
    }
    if (this.props.show && this.componentInstance.isOpen()) {
      if (this.props.children == null) {
        this.removeInfoWindowContent()
      } else {
        const oldContent = this.getHtmlDomByReactDom(prevProps.children)
          .innerText
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
  }

  componentWillUnmount () {
    this.removeInfoWindowContent()
    super.componentWillUnmount()
  }
  removeInfoWindowContent = () => {
    const { markerInstance, map } = this.context
    if (markerInstance) {
      markerInstance.closeInfoWindow()
      markerInstance.removeEventListener('click', this.onClickMarker)
    } else {
      if (this.props.position) {
        map.closeInfoWindow()
      }
    }
  }

  render () {
    return null
  }
}
