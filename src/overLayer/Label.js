import { Children, PropTypes } from 'react'
import { isEqual } from 'lodash'
import MapComponent from '../MapComponent'
import layer from '../propTypes/layer'
import map from '../propTypes/map'
import { point, size } from '../propTypes/index'
let countNum = 0
export default class Label extends MapComponent {
  static defaultProps = {
    enableMassClear: true,
    show: true
  }
  static propTypes = {
    children: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    zIndex: PropTypes.number,
    offset: size,
    enableMassClear: PropTypes.bool,
    position: point,
    show: PropTypes.bool
  }

  static contextTypes = {
    map: map,
    markerInstance: layer
  }
  createComponentInstance (props) {
    const label = new BMap.Label(props.children, this.getOptions(props))
    if (props.style) {
      label.setStyle(props.style)
    }
    if (props.title) {
      label.setTitle(props.title)
    }
    if (props.zIndex) {
      label.setZIndex(props.zIndex)
    }
    if (!props.show) {
      label.hide()
    }
    return label
  }

  updateComponentInstance (fromProps, toProps) {
    // var p = document.createElement('p')
    // p.innerText = `${countNum++}--${JSON.stringify(toProps)}--`
    // document.getElementById('error-ie8').appendChild(p)
    this.updatePropsByBoolFun('show', 'hide', fromProps.show, toProps.show)
    this.updatePropsBySetFun('setContent', fromProps.children, toProps.children)
    this.updatePropsBySetFun('setStyle', fromProps.style, toProps.style)
    this.updatePropsBySetFun('setTitle', fromProps.title, toProps.title)
    this.updatePropsBySetFun('setZIndex', fromProps.zIndex, toProps.zIndex)
    this.updatePropsBySetFun('setOffset', fromProps.offset, toProps.offset)
    this.updatePropsBySetFun(
      'setPosition',
      fromProps.position,
      toProps.position
    )
    this.updatePropsByBoolFun(
      'enableMassClear',
      'disableMassClear',
      fromProps.enableMassClear,
      toProps.enableMassClear
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
      markerInstance.setLabel(el)
    } else {
      // Attach to a Map
      if (position) {
        map.addOverlay(el)
      }
    }
  }

  componentDidUpdate (prevProps) {
    this.updateComponentInstance(prevProps, this.props)
  }

  componentWillUnmount () {
    this.removeInfoWindowContent()
    super.componentWillUnmount()
  }
  removeInfoWindowContent = () => {
    if (this.context.markerInstance) {
      // 跟随marker一起移除
    } else {
      this.context.map.removeOverlay(this.componentInstance)
    }
  }

  render () {
    return null
  }
}
