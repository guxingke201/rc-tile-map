import { PropTypes } from 'react'
import children from '../propTypes/children'
import MapLayer from '../MapLayer'
import layerContainer from '../propTypes/layerContainer'
import map from '../propTypes/map'

export default class OverLayer extends MapLayer {
  static defaultProps = {
    show: true
  }
  static propTypes = {
    children: children,
    show: PropTypes.bool
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
  componentWillMount () {
    super.componentWillMount()
    if (!this.props.show) {
      this.componentInstance.hide()
    }
  }
  updateComponentInstance (fromProps, toProps) {
    this.updatePropsByBoolFun('show', 'hide', fromProps.show, toProps.show)
    super.updateComponentInstance(fromProps, toProps)
  }
}
