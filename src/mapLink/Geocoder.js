import React, { PropTypes } from 'react'
import BaseMapLink from './BaseMapLink'
import { keys } from 'lodash'
import warning from 'warning'
export default class MapLinkGeocoder extends BaseMapLink {
  static propTypes = {
    address: PropTypes.string,
    location: PropTypes.string,
    coord_type: PropTypes.string,
    zoom: PropTypes.number
  }
  componentWillMount () {
    const { address, location } = this.props
    warning(
      address || location,
      'Failed propType: Required prop (`address` or `location`) was not specified in `MapLinkGeocoder`'
    )
  }
  getPathName = () => {
    return 'geocoder'
  }
  getPickArray = () => {
    return keys(MapLinkGeocoder.propTypes)
  }
}
