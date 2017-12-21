import { PropTypes } from 'react'

import latlngList from './latlngList'

export default PropTypes.oneOfType([
  PropTypes.instanceOf(BMap.Bounds),
  latlngList
])
