import React, { Children } from 'react'
import PropTypes from 'prop-types'
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
  createComponentInstance (props) {
    throw new Error('createComponentInstance() must be implemented')
  }

  // eslint-disable-next-line no-unused-vars
  updateComponentInstance (fromProps, toProps) {}

  componentWillMount () {
    super.componentWillMount()
    this.componentInstance = this.createComponentInstance(this.props)
    if (this.props.setComponentInstance) {
      this.props.setComponentInstance(this.componentInstance)
    }
  }
  componentDidUpdate (prevProps) {
    this.updateComponentInstance(prevProps, this.props)
  }

  render () {
    const { children } = this.props
    if (Children.count(children) > 1) {
      return <div style={{ display: 'none' }}>{children}</div>
    }
    return children == null ? null : children
  }
}
