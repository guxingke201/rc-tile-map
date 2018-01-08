import { PropTypes } from 'react'

import point from './point'

export default PropTypes.oneOfType([
  PropTypes.shape({
    center: point,
    zoom: PropTypes.number
  }),
  PropTypes.arrayOf(point)
])
