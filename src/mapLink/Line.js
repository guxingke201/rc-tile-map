import { PropTypes } from 'react'
import BaseMapLink from './BaseMapLink'
import { keys } from 'lodash'
export default class MapLinkLine extends BaseMapLink {
  static propTypes = {
    region: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    zoom: PropTypes.number
  }
  getPathName = () => {
    return 'line'
  }
  getPickArray = () => {
    return keys(MapLinkLine.propTypes)
  }
}
