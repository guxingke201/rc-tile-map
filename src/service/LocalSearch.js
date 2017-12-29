import React, { Component, PropTypes } from 'react'
import { location, renderOptions, map } from '../propTypes'
import MapComponent from '../MapComponent'
import { isEqual } from 'lodash'

export default class LocalSearch extends MapComponent {
  static propTypes = {
    location: location,
    renderOptions: renderOptions,
    onMarkersSet: PropTypes.func,
    onInfoHtmlSet: PropTypes.func,
    onResultsHtmlSet: PropTypes.func,
    pageCapacity: PropTypes.number,
    onSearchComplete: PropTypes.func,
    searchOption: PropTypes.shape({
      forceLocal: PropTypes.bool,
      customData: PropTypes.object
    }),
    keyword: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    const searchInstance = new BMap.LocalSearch(
      props.location ? props.location : this.context.map,
      { ...this.getOptions(props) }
    )
    if (props.keyword) {
      searchInstance.search(props.keyword, props.searchOption)
    }
    return searchInstance
  }

  updateComponentInstance (fromProps, toProps) {
    this.updatePropsBySetFun(
      'setLocation',
      fromProps.location,
      toProps.location
    )
    if (!isEqual(fromProps.keyword, toProps.keyword)) {
      return this.componentInstance.search(
        toProps.keyword,
        toProps.searchOption
      )
    }
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
