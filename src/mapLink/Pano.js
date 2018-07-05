import { PropTypes } from 'react'
import BaseMapLink from './BaseMapLink'
import { keys } from 'lodash'
import warning from 'warning'
export default class MapLinkPano extends BaseMapLink {
  static defaultProps = {
    nc: 1,
    lc: 1,
    issc: 1,
    ac: 1,
    z: 3,
    iec: 1
  }
  static propTypes = {
    ak: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    pid: PropTypes.string,
    uid: PropTypes.string,
    h: PropTypes.number,
    p: PropTypes.number,
    nc: PropTypes.number,
    lc: PropTypes.number,
    issc: PropTypes.number,
    ac: PropTypes.number,
    z: PropTypes.number,
    iec: PropTypes.number
  }
  componentWillMount () {
    const { x, y, pid, uid } = this.props
    warning(
      (x && y) || pid || uid,
      'Failed propType: Required prop (`xy` or `pid` or `uid`) was not specified in `MapLinkPano`'
    )
  }
  getPathName = () => {
    return 'pano/'
  }
  getPickArray = () => {
    return keys(MapLinkPano.propTypes)
  }
}
