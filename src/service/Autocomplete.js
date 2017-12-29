import React, { Component, PropTypes } from 'react'
import { location, renderOptions, htmlElement, map } from '../propTypes'
import MapComponent from '../MapComponent'

export default class Autocomplete extends MapComponent {
  static propTypes = {
    location: location,
    types: PropTypes.arrayOf(PropTypes.string),
    onSearchComplete: PropTypes.func,
    input: htmlElement
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    return new BMap.Autocomplete(this.getOptions(props))
  }

  updateComponentInstance (fromProps, toProps) {
    this.updatePropsBySetFun(
      'setLocation',
      fromProps.location,
      toProps.location
    )
  }

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
    return null
  }
}
