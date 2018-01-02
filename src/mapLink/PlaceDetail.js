import React, { PropTypes } from 'react'
import BaseMapLink from './BaseMapLink'
import { keys } from 'lodash'
export default class MapLinkPlaceDetail extends BaseMapLink {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    zoom: PropTypes.number
  }
  getPathName = () => {
    return 'place/detail'
  }
  getPickArray = () => {
    return keys(MapLinkPlaceDetail.propTypes)
  }
}
