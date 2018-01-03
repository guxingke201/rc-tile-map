import { PropTypes } from 'react'
import { isEqual } from 'lodash'
import OverLayer from './OverLayer'
import { point, size, layer, children, layerContainer, map } from '../propTypes'

export default class Marker extends OverLayer {
  static defaultProps = {
    enableMassClear: true,
    enableDragging: false,
    enableClicking: true,
    raiseOnDrag: false,
    show: true
  }
  static propTypes = {
    children: children,
    point: point.isRequired,
    offset: size,
    icon: PropTypes.instanceOf(BMap.Icon),
    enableMassClear: PropTypes.bool,
    enableDragging: PropTypes.bool,
    enableClicking: PropTypes.bool,
    raiseOnDrag: PropTypes.bool,
    draggingCursor: PropTypes.string,
    rotation: PropTypes.number,
    shadow: PropTypes.instanceOf(BMap.Icon),
    title: PropTypes.string
  }
  static contextTypes = {
    layerContainer: layerContainer,
    map: map,
    pane: PropTypes.string
  }
  static childContextTypes = {
    markerInstance: layer
  }

  getChildContext () {
    return {
      markerInstance: this.componentInstance
    }
  }

  createComponentInstance (props) {
    return new BMap.Marker(props.point, this.getOptions(props))
  }

  updateComponentInstance (fromProps, toProps) {
    super.updateComponentInstance(fromProps, toProps)
    this.updatePropsBySetFun('setPosition', fromProps.point, toProps.point)
    this.updatePropsBySetFun('setOffset', fromProps.offset, toProps.offset)
    this.updatePropsBySetFun('setIcon', fromProps.icon, toProps.icon)
    this.updatePropsByBoolFun(
      'enableMassClear',
      'disableMassClear',
      fromProps.enableMassClear,
      toProps.enableMassClear
    )
    this.updatePropsByBoolFun(
      'enableDragging',
      'disableDragging',
      fromProps.enableDragging,
      toProps.enableDragging
    )
    this.updatePropsBySetFun(
      'setRotation',
      fromProps.rotation,
      toProps.rotation
    )
    this.updatePropsBySetFun('setShadow', fromProps.shadow, toProps.shadow)
    this.updatePropsBySetFun('setTitle', fromProps.title, toProps.title)
  }
}
