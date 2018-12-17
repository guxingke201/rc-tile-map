import PropTypes from 'prop-types'
import map from './map'
import htmlElement from './htmlElement'
export default PropTypes.shape({
  map: map,
  panel: htmlElement,
  highlightMode: PropTypes.oneOf([
    window.BMAP_HIGHLIGHT_STEP,
    window.BMAP_HIGHLIGHT_ROUTE
  ]),
  selectFirstResult: PropTypes.bool,
  autoViewport: PropTypes.bool
})
