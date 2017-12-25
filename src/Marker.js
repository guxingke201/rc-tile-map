// @flow

import { PropTypes } from 'react'
import { isEqual } from 'lodash'
import OverLayer from './OverLayer'
import { point, size, layer, children, layerContainer, map } from './propTypes'

export default class Marker extends OverLayer {
  static propTypes = {
    children: children,
    position: point.isRequired,
    offset: size,
    icon: PropTypes.instanceOf(BMap.Icon),
    enableMassClear: PropTypes.bool,
    enableDragging: PropTypes.bool,
    enableClicking: PropTypes.bool,
    raiseOnDrag: PropTypes.bool,
    draggingCursor: PropTypes.string,
    rotation: PropTypes.number,
    shadow: PropTypes.instanceOf(BMap.Icon),
    title: PropTypes.string
  }
  static contextTypes = {
    layerContainer: layerContainer,
    map: map,
    pane: PropTypes.string
  }
  static childContextTypes = {
    infoWindowContainer: layer
  }

  getChildContext () {
    return {
      infoWindowContainer: this.tileMapElement
    }
  }

  createtileMapElement (props) {
    return new BMap.Marker(props.position, this.getOptions(props))
  }

  updatetileMapElement (fromProps, toProps) {
    if (!toProps.position.equals(fromProps.position)) {
      this.tileMapElement.setPosition(toProps.position)
    }
    if (!isEqual(toProps.offset, fromProps.offset)) {
      this.tileMapElement.setOffset(toProps.offset)
    }
    if (!isEqual(toProps.icon, fromProps.icon)) {
      this.tileMapElement.setIcon(toProps.icon)
    }
    if (toProps.enableMassClear !== fromProps.enableMassClear) {
      if (toProps.enableMassClear === true) {
        this.tileMapElement.enableMassClear()
      } else {
        this.tileMapElement.disableMassClear()
      }
    }
    if (toProps.enableDragging !== fromProps.enableDragging) {
      if (toProps.enableDragging === true) {
        this.tileMapElement.enableDragging()
      } else {
        this.tileMapElement.disableDragging()
      }
    }
    if (toProps.rotation !== fromProps.rotation) {
      this.tileMapElement.setRotation(toProps.rotation)
    }
    if (!isEqual(toProps.shadow, fromProps.shadow)) {
      this.tileMapElement.setShadow(toProps.shadow)
    }
    if (toProps.title !== fromProps.title) {
      this.tileMapElement.setTitle(toProps.title)
    }
  }
}
