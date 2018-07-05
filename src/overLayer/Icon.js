import { PropTypes } from 'react'
import MapComponent from '../MapComponent'
import { layer, size } from '../propTypes/index'

export default class Icon extends MapComponent {
  static defaultProps = {
    show: true
  }
  static propTypes = {
    imageUrl: PropTypes.string,
    imageSize: size,
    size: size,
    anchor: size,
    imageOffset: size,
    infoWindowAnchor: size,
    show: PropTypes.bool
  }

  static contextTypes = {
    markerInstance: layer
  }
  createComponentInstance (props) {
    const label = new window.BMap.Icon(
      props.imageUrl,
      props.size,
      this.getOptions(props)
    )
    if (props.imageSize) {
      label.setImageSize(props.imageSize)
    }
    if (!props.show) {
      label.hide()
    }
    return label
  }

  updateComponentInstance (fromProps, toProps) {
    this.updatePropsByBoolFun('show', 'hide', fromProps.show, toProps.show)
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
      markerInstance.setIcon(this.componentInstance)
    }
  }

  componentWillMount () {
    super.componentWillMount()
    this.componentInstance = this.createComponentInstance(this.props)
  }

  componentDidMount () {
    const { markerInstance } = this.context
    if (markerInstance) {
      markerInstance.setIcon(this.componentInstance)
    }
  }

  componentDidUpdate (prevProps) {
    this.updateComponentInstance(prevProps, this.props)
  }

  componentWillUnmount () {
    super.componentWillUnmount()
  }
  render () {
    return null
  }
}
