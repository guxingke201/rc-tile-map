import React, { Component, PropTypes } from 'react'
import { map, controlAnchor, size } from '../propTypes'
import MapControl from './MapControl'

export default class OverviewMapControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
    offset: new BMap.Size(0, 0),
    size: new BMap.Size(150, 150),
    isOpen: true
  }
  static propTypes = {
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool,
    size: size,
    isOpen: PropTypes.bool
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    return new BMap.OverviewMapControl(this.getOptions(props))
  }
  updateComponentInstance (fromProps, toProps) {
    super.updateComponentInstance(fromProps, toProps)
    this.updatePropsBySetFun('setSize', fromProps.size, toProps.size)
    this.updatePropsByBoolFun(
      'changeView',
      'changeView',
      fromProps.isOpen,
      toProps.isOpen
    )
  }
}
