import { PropTypes } from 'react'

import point from './point'

export default PropTypes.oneOfType([
  PropTypes.instanceOf(BMap.Bounds),
  PropTypes.arrayOf(point)
])
