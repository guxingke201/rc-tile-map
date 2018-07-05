import { PropTypes } from 'react'
import { location, htmlElement, map } from '../propTypes'
import MapComponent from '../MapComponent'
import { isEqual } from 'lodash'
export default class Autocomplete extends MapComponent {
  static propTypes = {
    keyword: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    location: location,
    types: PropTypes.arrayOf(PropTypes.string),
    onSearchComplete: PropTypes.func,
    input: htmlElement
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    let options = {}
    if (!props.input) {
      const div = document.createElement('div')
      document.body.appendChild(div)
      options = {
        ...this.getOptions(props),
        input: div
      }
    } else {
      options = this.getOptions(props)
    }
    return new window.BMap.Autocomplete(options)
  }

  updateComponentInstance (fromProps, toProps) {
    this.updatePropsBySetFun(
      'setLocation',
      fromProps.location,
      toProps.location
    )
    if (!isEqual(fromProps.keyword, toProps.keyword)) {
      return this.componentInstance.search(toProps.keyword)
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
