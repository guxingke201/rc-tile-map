import PropTypes from 'prop-types'
import { map, controlAnchor, size } from '../propTypes'
import MapControl from './MapControl'

export default class GeolocationControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_BOTTOM_LEFT,
    offset: window.BMap && new window.BMap.Size(0, 50),
    showAddressBar: true,
    enableAutoLocation: false
  }
  static propTypes = {
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool,
    showAddressBar: PropTypes.bool,
    enableAutoLocation: PropTypes.bool,
    locationIcon: PropTypes.object
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    return new window.BMap.GeolocationControl(this.getOptions(props))
  }
}
