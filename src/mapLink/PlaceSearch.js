import { PropTypes } from 'react'
import BaseMapLink from './BaseMapLink'
import { keys } from 'lodash'
import warning from 'warning'
export default class MapLinkPlaceSearch extends BaseMapLink {
  static propTypes = {
    query: PropTypes.string.isRequired,
    region: PropTypes.string,
    location: PropTypes.string,
    radius: PropTypes.number,
    bounds: PropTypes.string,
    coord_type: PropTypes.string,
    zoom: PropTypes.number
  }
  componentWillMount () {
    const { region, location, radius, bounds } = this.props
    warning(
      region || (location && radius) || bounds,
      'Failed propType: Required prop (`region` or (`location` and `radius`) or `bounds`) was not specified in `MapLinkPlaceSearch`'
    )
  }
  getPathName = () => {
    return 'place/search'
  }
  getPickArray = () => {
    return keys(MapLinkPlaceSearch.propTypes)
  }
}
