import PropTypes from 'prop-types'
import InfoBox from './InfoBox'
import layer from '../propTypes/layer'
import map from '../propTypes/map'
import { size } from '../propTypes/index'

export default class SimpleInfoWindow extends InfoBox {
  static defaultProps = {
    enableAutoPan: true,
    align: window.INFOBOX_AT_TOP,
    show: true,
    offset: window.BMap && new window.BMap.Size(0, 43),
    boxClass: 'ant-map-maplabel',
    boxStyle: {},
    closeIconMargin: '2px',
    closeIconUrl: '//cdncs.101.com/v0.1/static/fish/image/blank.gif',
    contentEvents: {},
    ignoreMarkerSize: true
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
    contentEvents: PropTypes.object,
    ignoreMarkerSize: PropTypes.bool
  }

  static contextTypes = {
    map: map,
    markerInstance: layer
  }
}
