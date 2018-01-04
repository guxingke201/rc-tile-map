import React, { PropTypes, Component } from 'react'
import children from '../propTypes/children'
import { pick, toPairs } from 'lodash'
const apiHost = '//api.map.baidu.com/'
const componyName = '网龙网络控股有限公司'
export default class BaseMapLink extends Component {
  static propTypes = {
    children: children,
    className: PropTypes.string,
    style: PropTypes.string,
    target: PropTypes.string
  }
  getPickArray = () => {
    return []
  }
  getPathName = () => {
    return ''
  }
  getLinkUrl = props => {
    return [
      apiHost,
      this.getPathName(),
      '?',
      toPairs(pick(props, this.getPickArray()))
        .map(item => item.join('='))
        .join('&'),
      `&output=html&src=${componyName}`
    ].join('')
  }

  render () {
    const { className, style, target, children } = this.props
    return (
      <a
        target={target || '_blank'}
        className={className}
        style={style}
        href={this.getLinkUrl(this.props)}
      >
        {children}
      </a>
    )
  }
}
