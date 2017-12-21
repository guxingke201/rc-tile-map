import { PropTypes } from 'react'

export default PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.number), // [number, number]
  PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number })
])
