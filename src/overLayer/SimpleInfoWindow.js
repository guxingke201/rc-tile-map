import { PropTypes } from 'react'
import InfoBox from './InfoBox'
import layer from '../propTypes/layer'
import map from '../propTypes/map'
import { size } from '../propTypes/index'

export default class SimpleInfoWindow extends InfoBox {
  static defaultProps = {
    enableAutoPan: true,
    align: window.INFOBOX_AT_TOP,
    show: true,
    closeIconUrl: '//cdncs.101.com/v0.1/static/fish/image/blank.gif',
    contentEvents: {}
  }
  static propTypes = {
    children: PropTypes.node,
    offset: size,
    boxClass: PropTypes.string,
    boxStyle: PropTypes.object,
    closeIconMargin: PropTypes.string,
    closeIconUrl: PropTypes.string,
    enableAutoPan: PropTypes.bool,
    align: PropTypes.oneOf([window.INFOBOX_AT_TOP, window.INFOBOX_AT_BOTTOM]),
    show: PropTypes.bool,
    contentEvents: PropTypes.object
  }

  static contextTypes = {
    map: map,
    markerInstance: layer
  }
}
