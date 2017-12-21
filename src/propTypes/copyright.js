import { PropTypes } from 'react'

import bounds from './bounds'

export default PropTypes.shape({
  bounds: bounds,
  content: PropTypes.string,
  id: PropTypes.number
})
