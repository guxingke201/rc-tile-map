import PropTypes from 'prop-types'
import { map, controlAnchor, size } from '../propTypes'
import MapComponent from '../MapComponent'

export default class MapControl extends MapComponent {
  static defaultProps = {
    show: true
  }
  static propTypes = {
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool
  }

  static contextTypes = {
    map: map
  }
  // eslint-disable-next-line no-unused-vars
  createComponentInstance (props) {
    throw new Error('createComponentInstance() must be implemented')
  }

  updateComponentInstance (fromProps, toProps) {
    this.updatePropsBySetFun('setAnchor', fromProps.anchor, toProps.anchor)
    this.updatePropsBySetFun('setOffset', fromProps.offset, toProps.offset)
    this.updatePropsByBoolFun('show', 'hide', fromProps.show, toProps.show)
  }

  componentWillMount () {
    super.componentWillMount()
    this.componentInstance = this.createComponentInstance(this.props)
    if (this.context.map) {
      this.context.map.addControl(this.componentInstance)
    }
    if (this.props.setComponentInstance) {
      this.props.setComponentInstance(this.componentInstance)
    }
  }
  componentDidUpdate (prevProps) {
    this.updateComponentInstance(prevProps, this.props)
  }
  componentWillUnmount () {
    if (this.context.map) {
      this.context.map.removeControl(this.componentInstance)
    }
  }

  render () {
    return null
  }
}
