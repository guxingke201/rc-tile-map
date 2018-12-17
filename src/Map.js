import { pick, isEqual } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import MapComponent from './MapComponent'
import children from './propTypes/children'
import point from './propTypes/point'
import layerContainer from './propTypes/layerContainer'
import map from './propTypes/map'
import viewport from './propTypes/viewport'

const MapOptions = ['minZoom', 'maxZoom', 'mapType', 'enableHighResolution', 'enableAutoResize', 'enableMapClick']
export default class Map extends MapComponent {
  static defaultProps = {
    mapType: window.BMAP_NORMAL_MAP,
    enableAutoResize: true,
    enableMapClick: true,
    disableDoubleClickZoom: false,
    disableScrollWheelZoom: false,
    center: window.BMap && new window.BMap.Point(116.404, 39.915),
    zoom: 11
  }
  static propTypes = {
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    mapType: PropTypes.object,
    enableAutoResize: PropTypes.bool,
    enableMapClick: PropTypes.bool,
    disableScrollWheelZoom: PropTypes.bool,
    disableDoubleClickZoom: PropTypes.bool,
    children: children,
    className: PropTypes.string,
    id: PropTypes.string,
    style: PropTypes.object,
    viewport: viewport,
    center: PropTypes.oneOfType([PropTypes.string, point]),
    zoom: PropTypes.number
  }

  static childContextTypes = {
    layerContainer: layerContainer,
    map: map
  }
  container
  _updating = false

  getChildContext () {
    return {
      layerContainer: this.componentInstance,
      map: this.componentInstance
    }
  }

  createComponentInstance (props) {
    const { center, zoom, disableScrollWheelZoom, disableDoubleClickZoom } = props
    const mapNow = new window.BMap.Map(this.container, pick(props, MapOptions))
    mapNow.centerAndZoom(center, zoom)
    if (disableScrollWheelZoom) {
      mapNow.disableScrollWheelZoom()
    } else {
      mapNow.enableScrollWheelZoom(true)
    }
    if (disableDoubleClickZoom) {
      mapNow.disableDoubleClickZoom()
    } else {
      mapNow.enableDoubleClickZoom(true)
    }
    return mapNow
  }

  updateComponentInstance (fromProps, toProps) {
    this._updating = true
    const { center, viewport, maxZoom, minZoom, zoom } = toProps
    const centerChange = center && !isEqual(center, fromProps.center)
    const zoomChange = typeof zoom === 'number' && zoom !== fromProps.zoom
    if (viewport && !isEqual(viewport, fromProps.viewport)) {
      this.componentInstance.setViewport(viewport)
    } else if (centerChange && zoomChange) {
      this.componentInstance.centerAndZoom(center, zoom)
    } else if (centerChange && !zoomChange) {
      this.componentInstance.setCenter(center)
    } else if (zoomChange && !centerChange) {
      this.componentInstance.setZoom(zoom)
    }
    if (typeof maxZoom === 'number' && maxZoom !== fromProps.maxZoom) {
      this.componentInstance.setMaxZoom(maxZoom)
    }
    if (typeof minZoom === 'number' && minZoom !== fromProps.minZoom) {
      this.componentInstance.setMinZoom(minZoom)
    }
    this._updating = false
  }
  componentDidMount () {
    this.componentInstance = this.createComponentInstance(this.props)
    if (this.props.setComponentInstance) {
      this.props.setComponentInstance(this.componentInstance)
    }
    super.componentDidMount()
    this.forceUpdate() // Re-render now that componentInstance is created
  }

  componentDidUpdate (prevProps) {
    this.updateComponentInstance(prevProps, this.props)
  }

  componentWillUnmount () {
    super.componentWillUnmount()
  }

  bindContainer = container => {
    this.container = container
  }

  render () {
    const map = this.componentInstance
    const children = map ? this.props.children : null

    return (
      <div className={this.props.className} id={this.props.id} ref={this.bindContainer} style={this.props.style}>
        {children}
      </div>
    )
  }
}
