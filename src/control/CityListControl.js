import PropTypes from 'prop-types'
import { map, controlAnchor, size } from '../propTypes'
import MapControl from './MapControl'

export default class CityListControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_TOP_LEFT,
    offset: window.BMap && new window.BMap.Size(10, 20)
  }
  static propTypes = {
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    return new window.BMap.CityListControl(this.getOptions(props))
  }
}
