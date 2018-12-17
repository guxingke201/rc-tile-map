import PropTypes from 'prop-types'
import map from './map'
import point from './point'
export default PropTypes.oneOfType([map, point, PropTypes.string])
