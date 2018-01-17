import { PropTypes } from 'react'

import point from './point'

export default PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.arrayOf(point)
])
