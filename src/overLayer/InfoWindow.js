import { Children, PropTypes } from 'react'
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
    enableMessage: true
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
    enableMessage: PropTypes.bool,
    message: PropTypes.string,
    position: point
  }

  static contextTypes = {
    map: map,
    markerInstance: layer
  }
  createComponentInstance (props) {
    return new BMap.InfoWindow(
      this.getHtmlDomByReactDom(props.children),
      this.getOptions(props)
    )
  }

  updateComponentInstance (fromProps, toProps) {
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

  componentDidMount () {
    const { position } = this.props
    const { map, markerInstance } = this.context
    const el = this.componentInstance
    if (markerInstance) {
      // Attach to container component
      markerInstance.addEventListener('click', function () {
        markerInstance.openInfoWindow(el)
      })
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
    if (this.componentInstance.isOpen()) {
      if (this.props.children == null) {
        this.removeInfoWindowContent()
      } else {
        this.componentInstance.setContent(
          this.getHtmlDomByReactDom(this.props.children)
        )
      }
    }
  }

  componentWillUnmount () {
    this.removeInfoWindowContent()
    super.componentWillUnmount()
  }
  removeInfoWindowContent = () => {
    if (this.context.markerInstance) {
      this.context.markerInstance.closeInfoWindow()
    } else {
      if (this.props.position) {
        this.context.map.closeInfoWindow()
      }
    }
  }

  render () {
    return null
  }
}
