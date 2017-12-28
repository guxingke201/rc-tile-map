import React, { Component, PropTypes } from 'react'
import { map, controlAnchor, size } from '../propTypes'
import MapControl from './MapControl'

export default class CityListControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_TOP_LEFT,
    offset: new BMap.Size(10, 20)
  }
  static propTypes = {
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    return new BMap.CityListControl(this.getOptions(props))
  }
}
