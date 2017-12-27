import { PropTypes } from 'react'

export default PropTypes.oneOf([
  window.BMAP_ANCHOR_TOP_LEFT,
  window.BMAP_ANCHOR_TOP_RIGHT,
  window.BMAP_ANCHOR_BOTTOM_LEFT,
  window.BMAP_ANCHOR_BOTTOM_RIGHT
])
