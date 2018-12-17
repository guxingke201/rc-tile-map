import PropTypes from 'prop-types'

import bounds from './bounds'

export default PropTypes.shape({
  bounds: bounds,
  content: PropTypes.string,
  id: PropTypes.number
})
