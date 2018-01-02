import React, { PropTypes } from 'react'
import BaseMapLink from './BaseMapLink'
import { keys } from 'lodash'
import warning from 'warning'
export default class MapLinkDirection extends BaseMapLink {
  static propTypes = {
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['transit', 'driving', 'walking']),
    region: PropTypes.string,
    origin_region: PropTypes.string,
    destination_region: PropTypes.string,
    coord_type: PropTypes.string,
    zoom: PropTypes.number
  }
  componentWillMount () {
    const { region, origin_region, destination_region } = this.props
    warning(
      region || (origin_region && destination_region),
      'Failed propType: Required prop (`region` or (`origin_region` and `destination_region`)) was not specified in `MapLinkDirection`'
    )
  }
  getPathName = () => {
    return 'direction'
  }
  getPickArray = () => {
    return keys(MapLinkDirection.propTypes)
  }
}
