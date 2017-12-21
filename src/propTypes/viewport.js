import { PropTypes } from 'react'

import latlng from './latlng'

export default PropTypes.shape({
  center: latlng,
  zoom: PropTypes.number
})
