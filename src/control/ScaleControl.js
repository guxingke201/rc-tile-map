import React, { Component, PropTypes } from 'react'
import { map, controlAnchor, size } from '../propTypes'
import MapControl from './MapControl'

export default class ScaleControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_BOTTOM_LEFT,
    offset: window.BMap && new BMap.Size(112, 26)
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
    return new BMap.ScaleControl(this.getOptions(props))
  }
}
