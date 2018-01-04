import { PropTypes } from 'react'
import OverLayer from './OverLayer'
import { point, children, map } from '../propTypes'

export default class Polyline extends OverLayer {
  static defaultProps = {
    strokeColor: 'blue',
    strokeWeight: 2,
    strokeOpacity: 0.5,
    strokeStyle: 'solid',
    enableMassClear: true,
    enableEditing: false,
    enableClicking: true,
    show: true
  }
  static propTypes = {
    children: children,
    points: PropTypes.arrayOf(point).isRequired,
    strokeColor: PropTypes.string,
    strokeWeight: PropTypes.number,
    strokeOpacity: PropTypes.number,
    strokeStyle: PropTypes.string,
    enableMassClear: PropTypes.bool,
    enableEditing: PropTypes.bool,
    enableClicking: PropTypes.bool
  }
  static contextTypes = {
    map: map,
    pane: PropTypes.string
  }
  createComponentInstance (props) {
    return new BMap.Polyline(props.points, this.getOptions(props))
  }

  updateComponentInstance (fromProps, toProps) {
    super.updateComponentInstance(fromProps, toProps)
    this.updatePropsBySetFun('setPath', fromProps.points, toProps.points)
    this.updatePropsBySetFun(
      'setStrokeColor',
      fromProps.strokeColor,
      toProps.strokeColor
    )
    this.updatePropsBySetFun(
      'setStrokeWeight',
      fromProps.strokeWeight,
      toProps.strokeWeight
    )
    this.updatePropsBySetFun(
      'setStrokeOpacity',
      fromProps.strokeOpacity,
      toProps.strokeOpacity
    )
    this.updatePropsBySetFun(
      'setStrokeStyle',
      fromProps.strokeStyle,
      toProps.strokeStyle
    )
    this.updatePropsByBoolFun(
      'enableMassClear',
      'disableMassClear',
      fromProps.enableMassClear,
      toProps.enableMassClear
    )
    this.updatePropsByBoolFun(
      'enableEditing',
      'disableEditing',
      fromProps.enableEditing,
      toProps.enableEditing
    )
  }
}
