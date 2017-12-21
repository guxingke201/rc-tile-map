import { PropTypes } from 'react'
import children from './propTypes/children'
import copyright from './propTypes/copyright'
import MapLayer from './MapLayer'
import { debug } from 'util'
import layerContainer from './propTypes/layerContainer'
import map from './propTypes/map'

export default class TileLayer extends MapLayer {
  static propTypes = {
    children: children,
    getTilesUrl: PropTypes.func,
    getCopyright: PropTypes.func,
    isTransparentPng: PropTypes.func,
    transparentPng: PropTypes.bool,
    tileUrlTemplate: PropTypes.string,
    copyright: copyright,
    zIndex: PropTypes.number
  }
  static contextTypes = {
    layerContainer: layerContainer,
    map: map,
    pane: PropTypes.string
  }
  createtileMapElement (props) {
    const layer = new BMap.TileLayer(this.getOptions(props))
    if (props.getTilesUrl) {
      layer.getTilesUrl = props.getTilesUrl
    }
    if (props.getCopyright) {
      layer.getCopyright = getCopyright
    }
    if (props.isTransparentPng) {
      layer.isTransparentPng = isTransparentPng
    }
    return layer
  }

  updatetileMapElement (fromProps, toProps) {
    super.updatetileMapElement(fromProps, toProps)
  }
}
