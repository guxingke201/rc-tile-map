import PropTypes from 'prop-types'

import point from './point'

export default PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.arrayOf(point)
])
