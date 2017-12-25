import React, { Children, PropTypes } from 'react'
import MapComponent from './MapComponent'
import children from './propTypes/children'
import layerContainer from './propTypes/layerContainer'
import map from './propTypes/map'

export default class MapLayer extends MapComponent {
  static propTypes = {
    children: children
  }

  static contextTypes = {
    layerContainer: layerContainer,
    map: map,
    pane: PropTypes.string
  }

  getLayerContainer = () => {
    return this.context.layerContainer || this.context.map
  }

  // eslint-disable-next-line no-unused-vars
  createtileMapElement (props) {
    throw new Error('createtileMapElement() must be implemented')
  }

  // eslint-disable-next-line no-unused-vars
  updatetileMapElement (fromProps, toProps) {}

  componentWillMount () {
    super.componentWillMount()
    this.tileMapElement = this.createtileMapElement(this.props)
  }

  componentDidUpdate (prevProps) {
    this.updatetileMapElement(prevProps, this.props)
  }

  render () {
    const { children } = this.props
    if (Children.count(children) > 1) {
      return <div style={{ display: 'none' }}>{children}</div>
    }
    return children == null ? null : children
  }
}
