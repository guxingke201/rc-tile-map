import { PropTypes } from 'react'

import point from './point'

export default PropTypes.shape({
  center: point,
  zoom: PropTypes.number
})
