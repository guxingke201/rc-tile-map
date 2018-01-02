import React, { PropTypes } from 'react'
import BaseMapLink from './BaseMapLink'
import { keys } from 'lodash'
export default class MapLinkMarker extends BaseMapLink {
  static propTypes = {
    location: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    coord_type: PropTypes.string,
    zoom: PropTypes.number
  }
  getPathName = () => {
    return 'marker'
  }
  getPickArray = () => {
    return keys(MapLinkMarker.propTypes)
  }
}
