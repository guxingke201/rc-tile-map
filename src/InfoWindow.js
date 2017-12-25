// @flow

import { Children, PropTypes } from 'react'

import MapComponent from './MapComponent'
import latlng from './propTypes/latlng'
import layer from './propTypes/layer'
import map from './propTypes/map'
import { point, size } from './propTypes/index'

export default class InfoWindow extends MapComponent {
  static defaultProps = {
    width: 0,
    height: 0
  }
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    maxWidth: PropTypes.number,
    offset: size,
    title: PropTypes.string,
    enableAutoPan: PropTypes.bool,
    enableCloseOnClick: PropTypes.bool,
    enableMessage: PropTypes.bool,
    message: PropTypes.string,
    position: point
  }

  static contextTypes = {
    map: map,
    infoWindowContainer: layer
  }
  createtileMapElement (props) {
    return new BMap.InfoWindow(
      this.getHtmlDomByReactDom(props.children),
      this.getOptions(props)
    )
  }

  updatetileMapElement (fromProps, toProps) {
    if (toProps.title !== fromProps.title) {
      this.tileMapElement.setTitle(toProps.title)
    }
  }

  componentWillMount () {
    super.componentWillMount()
    this.tileMapElement = this.createtileMapElement(this.props)
  }

  componentDidMount () {
    const { position } = this.props
    const { map, infoWindowContainer } = this.context
    const el = this.tileMapElement
    if (infoWindowContainer) {
      // Attach to container component
      infoWindowContainer.addEventListener('click', function () {
        infoWindowContainer.openInfoWindow(el)
      })
    } else {
      // Attach to a Map
      if (position) {
        map.openInfoWindow(el, position)
      }
    }
  }

  componentDidUpdate (prevProps) {
    this.updatetileMapElement(prevProps, this.props)

    if (this.tileMapElement.isOpen()) {
      this.renderInfoWindowContent()
    }
  }

  componentWillUnmount () {
    this.removeInfoWindowContent()
    super.componentWillUnmount()
  }
  renderInfoWindowContent = () => {
    if (this.props.children == null) {
      this.removeInfoWindowContent()
    } else {
      this.tileMapElement.setContent(this.getHtmlDomByReactDom(props.children))
    }
  }

  removeInfoWindowContent = () => {
    if (this.context.infoWindowContainer) {
      this.context.infoWindowContainer.closeInfoWindow()
    } else {
      if (this.props.position) {
        this.context.map.closeInfoWindow()
      }
    }
  }

  render () {
    return null
  }
}
