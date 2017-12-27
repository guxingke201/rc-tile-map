import { PropTypes } from 'react'
import OverLayer from './OverLayer'
import { point, children, map } from '../propTypes'

export default class Circle extends OverLayer {
  static defaultProps = {
    strokeColor: 'blue',
    fillColor: 'white',
    strokeWeight: 2,
    strokeOpacity: 0.5,
    fillOpacity: 0.5,
    strokeStyle: 'solid',
    enableMassClear: true,
    enableEditing: false,
    enableClicking: false
  }
  static propTypes = {
    children: children,
    center: point.isRequired,
    radius: PropTypes.number,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    strokeWeight: PropTypes.number,
    strokeOpacity: PropTypes.number,
    fillOpacity: PropTypes.number,
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
    return new BMap.Circle(props.center, props.radius, this.getOptions(props))
  }

  updateComponentInstance (fromProps, toProps) {
    this.updatePropsBySetFun('setCenter', fromProps.center, toProps.center)
    this.updatePropsBySetFun('setRadius', fromProps.radius, toProps.radius)
    this.updatePropsBySetFun(
      'setStrokeColor',
      fromProps.strokeColor,
      toProps.strokeColor
    )
    this.updatePropsBySetFun(
      'setFillColor',
      fromProps.fillColor,
      toProps.fillColor
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
      'setFillOpacity',
      fromProps.fillOpacity,
      toProps.fillOpacity
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
