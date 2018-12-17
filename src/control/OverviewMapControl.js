import PropTypes from 'prop-types'
import { map, controlAnchor, size } from '../propTypes'
import MapControl from './MapControl'

export default class OverviewMapControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
    offset: window.BMap && new window.BMap.Size(0, 0),
    size: window.BMap && new window.BMap.Size(150, 150),
    isOpen: false
  }
  static propTypes = {
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool,
    size: size,
    isOpen: PropTypes.bool
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    return new window.BMap.OverviewMapControl(this.getOptions(props))
  }
  updateComponentInstance (fromProps, toProps) {
    super.updateComponentInstance(fromProps, toProps)
    this.updatePropsBySetFun('setSize', fromProps.size, toProps.size)
    this.updatePropsByBoolFun('changeView', 'changeView', fromProps.isOpen, toProps.isOpen)
  }
}
