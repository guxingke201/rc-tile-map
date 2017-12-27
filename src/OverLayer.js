import { PropTypes } from 'react'
import children from './propTypes/children'
import MapLayer from './MapLayer'
import layerContainer from './propTypes/layerContainer'
import map from './propTypes/map'

export default class OverLayer extends MapLayer {
  static propTypes = {
    children: children
  }
  static contextTypes = {
    layerContainer: layerContainer,
    map: map,
    pane: PropTypes.string
  }
  componentDidMount () {
    super.componentDidMount()
    this.getLayerContainer().addOverlay(this.componentInstance)
  }
  componentWillUnmount () {
    super.componentWillUnmount()
    this.getLayerContainer().removeOverlay(this.componentInstance)
  }
  updateComponentInstance (fromProps, toProps) {
    super.updateComponentInstance(fromProps, toProps)
  }
}
