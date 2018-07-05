import { PropTypes } from 'react'
import { map, controlAnchor, size, children } from '../propTypes'
import MapControl from './MapControl'

export default class CustomControl extends MapControl {
  static defaultProps = {
    show: true,
    anchor: window.BMAP_ANCHOR_TOP_LEFT,
    offset: window.BMap && new window.BMap.Size(10, 10)
  }
  static propTypes = {
    children: children.isRequired,
    anchor: controlAnchor,
    offset: size,
    show: PropTypes.bool
  }

  static contextTypes = {
    map: map
  }
  createComponentInstance (props) {
    // 定义一个控件类,即function
    function MyCustomControl (options) {
      // 默认停靠位置和偏移量
      this.defaultAnchor = options.anchor
      this.defaultOffset = options.offset
    }

    // 通过JavaScript的prototype属性继承于BMap.Control
    MyCustomControl.prototype = new window.BMap.Control()

    // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
    // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
    MyCustomControl.prototype.initialize = map => {
      // 将DOM元素返回
      const customDom = this.getHtmlDomByReactDom(props.children)
      map.getContainer().appendChild(customDom)
      return customDom
    }
    return new MyCustomControl(this.getOptions(props))
  }
}
