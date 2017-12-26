import { Children, PropTypes } from 'react'
import MapComponent from './MapComponent'
import { layer, size } from './propTypes/index'

export default class Icon extends MapComponent {
  static propTypes = {
    imageUrl: PropTypes.string,
    imageSize: size,
    size: size,
    anchor: size,
    imageOffset: size,
    infoWindowAnchor: size
  }

  static contextTypes = {
    markerInstance: layer
  }
  createtileMapElement (props) {
    const label = new BMap.Icon(
      props.imageUrl,
      props.size,
      this.getOptions(props)
    )
    if (props.imageSize) {
      label.setImageSize(imageSize)
    }
    return label
  }

  updatetileMapElement (fromProps, toProps) {
    this.updatePropsBySetFun(
      'setImageUrl',
      fromProps.imageUrl,
      toProps.imageUrl
    )
    this.updatePropsBySetFun('setSize', fromProps.size, toProps.size)
    this.updatePropsBySetFun(
      'setImageSize',
      fromProps.imageSize,
      toProps.imageSize
    )
    this.updatePropsBySetFun('setAnchor', fromProps.anchor, toProps.anchor)
    this.updatePropsBySetFun(
      'setImageOffset',
      fromProps.imageOffset,
      toProps.imageOffset
    )
    this.updatePropsBySetFun(
      'setInfoWindowAnchor',
      fromProps.infoWindowAnchor,
      toProps.infoWindowAnchor
    )
    const { markerInstance } = this.context
    if (markerInstance) {
      markerInstance.setIcon(this.tileMapElement)
    }
  }

  componentWillMount () {
    super.componentWillMount()
    this.tileMapElement = this.createtileMapElement(this.props)
  }

  componentDidMount () {
    const { markerInstance } = this.context
    if (markerInstance) {
      markerInstance.setIcon(this.tileMapElement)
    }
  }

  componentDidUpdate (prevProps) {
    this.updatetileMapElement(prevProps, this.props)
  }

  componentWillUnmount () {
    super.componentWillUnmount()
  }
  render () {
    return null
  }
}
