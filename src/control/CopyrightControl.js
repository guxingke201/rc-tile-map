import React, { Component, PropTypes } from 'react'
import { map, controlAnchor, size, copyright } from '../propTypes'
import MapControl from './MapControl'

export default class CopyrightControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
    offset: new BMap.Size(5, 2)
  }
  static propTypes = {
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool,
    copyright: copyright
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    const copyrightInstance = new BMap.CopyrightControl(this.getOptions(props))
    copyrightInstance.addCopyright(props.copyright)
    return copyrightInstance
  }
}
