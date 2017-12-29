import { PropTypes } from 'react'
import map from './map'
import point from './point'
export default PropTypes.oneOfType([map, point, PropTypes.string])
