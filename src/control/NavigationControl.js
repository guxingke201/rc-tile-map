import { PropTypes } from 'react'
import { map, controlAnchor, size } from '../propTypes'
import MapControl from './MapControl'

export default class NavigationControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_TOP_LEFT,
    offset: window.BMap && new window.BMap.Size(10, 10),
    type: window.BMAP_NAVIGATION_CONTROL_LARGE,
    showZoomInfo: true,
    enableGeolocation: false
  }
  static propTypes = {
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool,
    type: PropTypes.oneOf([
      window.BMAP_NAVIGATION_CONTROL_LARGE,
      window.BMAP_NAVIGATION_CONTROL_SMALL,
      window.BMAP_NAVIGATION_CONTROL_PAN,
      window.BMAP_NAVIGATION_CONTROL_ZOOM
    ]),
    showZoomInfo: PropTypes.bool,
    enableGeolocation: PropTypes.bool
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    return new window.BMap.NavigationControl(this.getOptions(props))
  }
  updateComponentInstance (fromProps, toProps) {
    super.updateComponentInstance(fromProps, toProps)
    this.updatePropsBySetFun('setType', fromProps.type, toProps.type)
  }
}
