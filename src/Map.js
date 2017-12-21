import { forEach, isUndefined, pick } from 'lodash'
import React, { PropTypes } from 'react'

import MapComponent from './MapComponent'
import bounds from './propTypes/bounds'
import children from './propTypes/children'
import point from './propTypes/point'
import layerContainer from './propTypes/layerContainer'
import map from './propTypes/map'
import viewport from './propTypes/viewport'

const Map_Options = [
  'minZoom',
  'maxZoom',
  'mapType',
  'enableHighResolution',
  'enableAutoResize',
  'enableMapClick'
]

const normalizeCenter = pos =>
  Array.isArray(pos) ? [pos[0], pos[1]] : [pos.lat, pos.lon ? pos.lon : pos.lng]

const splitClassName = (className = '') => className.split(' ').filter(Boolean)

export default class Map extends MapComponent {
  static defaultProps = {
    disableScrollWheelZoom: false,
    center: new BMap.Point(116.404, 39.915),
    zoom: 11
  }
  static propTypes = {
    onViewportChange: PropTypes.func,
    disableScrollWheelZoom: PropTypes.bool,
    disableDoubleClickZoom: PropTypes.bool,
    center: point,
    children: children,
    className: PropTypes.string,
    id: PropTypes.string,
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    style: PropTypes.object,
    viewport: viewport,
    zoom: PropTypes.number
  }

  static childContextTypes = {
    layerContainer: layerContainer,
    map: map
  }

  container
  viewport = {
    center: undefined,
    zoom: undefined
  }

  _updating = false

  constructor (props, context) {
    super(props, context)
  }

  getChildContext () {
    return {
      layerContainer: this.tileMapElement,
      map: this.tileMapElement
    }
  }

  createtileMapElement (props) {
    const {
      viewport,
      center,
      zoom,
      disableScrollWheelZoom,
      disableDoubleClickZoom
    } = props
    const mapNow = new BMap.Map(this.container, pick(props, Map_Options))
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
    if (viewport) {
      mapNow.setViewport(viewport)
    }
    return mapNow
  }

  updatetileMapElement (fromProps, toProps) {
    this._updating = true

    const { center, className, viewport, maxZoom, minZoom, zoom } = toProps

    if (viewport && viewport !== fromProps.viewport) {
      const c = viewport.center ? viewport.center : center
      const z = viewport.zoom == null ? zoom : viewport.zoom
      this.tileMapElement.centerAndZoom(c, z)
    } else if (center && this.shouldUpdateCenter(center, fromProps.center)) {
      this.tileMapElement.centerAndZoom(center, zoom)
    } else if (typeof zoom === 'number' && zoom !== fromProps.zoom) {
      if (fromProps.zoom == null) {
        this.tileMapElement.centerAndZoom(center, zoom)
      } else {
        this.tileMapElement.centerAndZoom(zoom)
      }
    }
    if (typeof maxZoom === 'number' && maxZoom !== fromProps.maxZoom) {
      this.tileMapElement.setMaxZoom(maxZoom)
    }
    if (typeof minZoom === 'number' && minZoom !== fromProps.minZoom) {
      this.tileMapElement.setMinZoom(maxZoom)
    }

    this._updating = false
  }

  onViewportChange = () => {
    if (this.props.onViewportChange && !this._updating) {
      const center = this.tileMapElement.getCenter()
      this.viewport = {
        center: center ? [center.lat, center.lng] : undefined,
        zoom: this.tileMapElement.getZoom()
      }
      this.props.onViewportChange(this.viewport)
    }
  }

  onViewportChanged = () => {
    if (this.props.onViewportChanged && !this._updating) {
      this.props.onViewportChanged(this.viewport)
    }
  }

  componentDidMount () {
    this.tileMapElement = this.createtileMapElement(this.props)

    this.tileMapElement.addEventListener('moving', this.onViewportChange)
    this.tileMapElement.addEventListener('moveend', this.onViewportChanged)

    super.componentDidMount()
    this.forceUpdate() // Re-render now that tileMapElement is created
  }

  componentDidUpdate (prevProps) {
    this.updatetileMapElement(prevProps, this.props)
  }

  componentWillUnmount () {
    super.componentWillUnmount()
    this.tileMapElement.removeEventListener('moving', this.onViewportChange)
    this.tileMapElement.removeEventListener('moveend', this.onViewportChanged)
    // this.tileMapElement.remove()//
  }

  bindContainer = container => {
    this.container = container
  }

  shouldUpdateCenter (next, prev) {
    if (!prev) return true
    next = normalizeCenter(next)
    prev = normalizeCenter(prev)
    return next[0] !== prev[0] || next[1] !== prev[1]
  }

  render () {
    const map = this.tileMapElement
    const children = map ? this.props.children : null

    return (
      <div
        className={this.props.className}
        id={this.props.id}
        ref={this.bindContainer}
        style={this.props.style}
      >
        {children}
      </div>
    )
  }
}
