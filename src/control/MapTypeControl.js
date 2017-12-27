import React, { Component, PropTypes } from 'react'
import { map, controlAnchor, size } from '../propTypes'
import MapControl from './MapControl'

export default class MapTypeControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_TOP_LEFT,
    offset: new BMap.Size(10, 10),
    type: window.BMAP_MAPTYPE_CONTROL_HORIZONTAL,
    mapTypes: [
      window.BMAP_NORMAL_MAP,
      window.BMAP_SATELLITE_MAP,
      window.BMAP_PERSPECTIVE_MAP,
      window.BMAP_HYBRID_MAP
    ]
  }
  static propTypes = {
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool,
    type: PropTypes.oneOf([
      window.BMAP_MAPTYPE_CONTROL_HORIZONTAL,
      window.BMAP_MAPTYPE_CONTROL_DROPDOWN,
      window.BMAP_MAPTYPE_CONTROL_MAP
    ]),
    mapTypes: PropTypes.array
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    return new BMap.MapTypeControl(this.getOptions(props))
  }
}
