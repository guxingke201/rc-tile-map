---
category: Components
subtitle: 地图
type: Data Entry
title: TileMap
---

地图组件。

## UEDC 编号

（UEDC 暂无）

## 何时使用

* 需要显示或获取空间数据的时候。
* 直接调起百度地图

## API

密钥 ak 业务方使用时自己维护，[快速入门](http://lbsyun.baidu.com/index.php?title=jspopular/guide/helloworld)

```html
<!-- 按官方方式引入会出现警告，可以使用下面的引入方式避免出现警告 -->
<!-- 直接调起百度地图不需要引入 -->
<script type="text/javascript" src="//api.map.baidu.com/getscript?v=3.0&ak=zIT2dNIgEojIIYjD91wIbiespAnwM0Zu&services=&t=20171220141726"></script>
```

```jsx
<Map
  center={this.state.center}
  zoom={this.state.zoom}
  className="tilemap-demo"
/>
```

### NDMap

相当于 BMap，未定义或已有组件满足不了时使用。百度地图部分 API 失效，下面 API 不会列出。

### 共同的 API

以下 API 为 所有地图组件共享的 API。

| 参数                 | 说明                | 类型     | 默认值 |
| -------------------- | ------------------- | -------- | ------ |
| on\*                 | on+百度地图事件名称 | function | -      |
| setComponentInstance | 设置组件实例        | function | -      |

### 地图 Map

| 参数                   | 说明                                                | 类型                                                                                                                                                                        | 默认值          |
| ---------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| viewport               | 设置地图视野，相当于 center+zoom，viewport 优先生效 | [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0)[]\|[Viewport](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a0b3) | -               |
| center                 | 设置地图中心点                                      | [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0)                                                                                          | 北京            |
| zoom                   | 设置地图的缩放等级                                  | number                                                                                                                                                                      | 11              |
| minZoom                | 地图允许展示的最小级别                              | number                                                                                                                                                                      | -               |
| maxZoom                | 地图允许展示的最大级别                              | number                                                                                                                                                                      | -               |
| mapType                | 地图类型，默认为                                    | [MapType](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a5b0)                                                                                        | BMAP_NORMAL_MAP |
| enableAutoResize       | 是否自动适应地图容器变化                            | boolean                                                                                                                                                                     | true            |
| enableMapClick         | 是否开启底图可点功能                                | boolean                                                                                                                                                                     | true            |
| disableScrollWheelZoom | 是否禁用滚轮放大缩小                                | boolean                                                                                                                                                                     | false           |
| disableDoubleClickZoom | 是否禁用双击放大                                    | boolean                                                                                                                                                                     | false           |
| className              | 地图平台容器节点样式类名称                          | string                                                                                                                                                                      | -               |
| id                     | 地图平台容器节点 ID                                 | string                                                                                                                                                                      | -               |
| style                  | 地图平台容器节点样式                                | Object                                                                                                                                                                      | -               |

### 图层 TileLayer

| 参数            | 说明                                                                                                                                                                                                                                                                                                                          | 类型                                            | 默认值 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ |
| getTilesUrl     | 抽象。向地图返回地图图块的网址，图块索引由 tileCoord 的 x 和 y 属性在指定的缩放级别 zoom 提供。如果您在 TileLayerOptions 中提供了 tileUrlTemplate 参数，则可不实现此接口                                                                                                                                                      | function(tileCoord: Pixel, zoom: Number):string | -      |
| tileUrlTemplate | 指定图块网址模板，该模板可以针对每个图块请求而展开，以根据现有的图块坐标系引用唯一的图块。模板的格式应该为：http://yourhost/tile?x={X}&y={Y}&z={Z}.png 其中 X 和 Y 分别指纬度和经度图块坐标，Z 指缩放级别，比如： http://yourhost/tile?x=3&y=27&z=5.png 如果您没有提供图块网址模板，您需要实现 TileLayer.getTileUrl()抽象方法 | string                                          | -      |
| zIndex          | 图层的 zIndex                                                                                                                                                                                                                                                                                                                 | number                                          | -      |

### 标注 Marker

| 参数            | 说明                                                            | 类型                                                                               | 默认值                                                                          |
| --------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| children        | 设置 Marker 关联覆盖物，如 Label，InfoWindow                    | ReactNode                                                                          | -                                                                               |
| point           | 必填，指定了图像标注所在的地理位置                              | [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) | -                                                                               |
| offset          | 标注的位置偏移值                                                | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)  | -                                                                               |
| icon            | 标注所用的图标对象                                              | [Icon](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b5)  | [marker_red_sprite.png](http://api0.map.bdimg.com/images/marker_red_sprite.png) |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物                       | boolean                                                                            | true                                                                            |
| enableDragging  | 是否启用拖拽                                                    | boolean                                                                            | false                                                                           |
| enableClicking  | 是否响应点击事件                                                | boolean                                                                            | true                                                                            |
| raiseOnDrag     | 拖拽标注时，标注是否开启离开地图表面效果                        | boolean                                                                            | false                                                                           |
| draggingCursor  | 拖拽标注时的鼠标指针样式。此属性值需遵循 CSS 的 cursor 属性规范 | string                                                                             | -                                                                               |
| rotation        | 旋转角度                                                        | number                                                                             | -                                                                               |
| shadow          | 阴影图标                                                        | [Icon](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b5)  | [marker_red_sprite.png](http://api0.map.bdimg.com/images/marker_red_sprite.png) |
| title           | 鼠标移到 marker 上的显示内容                                    | string                                                                             | -                                                                               |
| show            | 是否显示组件                                                    | boolean                                                                            | true                                                                            |

### 信息窗口 InfoWindow

| 参数               | 说明                                                                                                                                                                                               | 类型                                                                               | 默认值 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------ |
| children           | 设置信息窗口内容。支持 HTML 内容。 content 参数支持传入 DOM 结点                                                                                                                                   | string\|node                                                                       | -      |
| width              | 信息窗宽度，单位像素。取值范围：0, 220 - 730。如果您指定宽度为 0，则信息窗口的宽度将按照其内容自动调整                                                                                             | number                                                                             | 0      |
| height             | 信息窗高度，单位像素。取值范围：0, 60 - 650。如果您指定高度为 0，则信息窗口的高度将按照其内容自动调整                                                                                              | number                                                                             | 0      |
| maxWidth           | 信息窗最大化时的宽度，单位像素。取值范围：220 - 730                                                                                                                                                | number                                                                             | -      |
| offset             | 信息窗位置偏移值。默认情况下在地图上打开的信息窗底端的尖角将指向其地理坐标，在标注上打开的信息窗底端尖角的位置取决于标注所用图标的 infoWindowOffset 属性值，您可以为信息窗添加偏移量来改变默认位置 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)  | -      |
| title              | 信息窗标题文字，支持 HTML 内容                                                                                                                                                                     | string                                                                             | -      |
| enableAutoPan      | 是否开启信息窗口打开时地图自动移动                                                                                                                                                                 | boolean                                                                            | true   |
| enableCloseOnClick | 是否开启点击地图关闭信息窗口                                                                                                                                                                       | boolean                                                                            | true   |
| position           | 指定信息窗口所在的地理位置，没有放到 Marker 的 children 时，必填                                                                                                                                   | [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) | -      |
| show               | 是否显示组件                                                                                                                                                                                       | boolean                                                                            | true   |
| contentEvents      | 内容事件绑定（格式是{key:function}，其中 key 为显示内容中 dom 元素的 className+事件名称，如：confirmButton.click）                                                                                 | {key:function(evt, markerInstance, infoWindowInstance)}                            |

### 自定义信息窗口 InfoBox

| 参数            | 说明                                                                                                                                                                                               | 类型                                                                              | 默认值                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------- |
| children        | 设置信息窗口内容。支持 HTML 内容。 content 参数支持传入 DOM 结点                                                                                                                                   | string\|node                                                                      | -                                                  |
| offset          | 信息窗位置偏移值。默认情况下在地图上打开的信息窗底端的尖角将指向其地理坐标，在标注上打开的信息窗底端尖角的位置取决于标注所用图标的 infoWindowOffset 属性值，您可以为信息窗添加偏移量来改变默认位置 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(0, 15)                               |
| boxClass        | 定义 infoBox 的 class                                                                                                                                                                              | string                                                                            | 'infoBox'                                          |
| boxStyle        | 定义 infoBox 的 style,此项会覆盖 boxClass                                                                                                                                                          | object                                                                            | {}                                                 |
| closeIconMargin | 关闭按钮的 margin                                                                                                                                                                                  | string                                                                            | '2px'                                              |
| closeIconUrl    | 关闭按钮的 url 地址                                                                                                                                                                                | string                                                                            | '//cdncs.101.com/v0.1/static/fish/image/close.png' |
| enableAutoPan   | 是否启动自动平移功能                                                                                                                                                                               | boolean                                                                           | true                                               |
| align           | 基于哪个位置进行定位，取值为[INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM]                                                                                                                                     | [INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM]                                                | INFOBOX_AT_TOP                                     |
| show            | 是否显示组件                                                                                                                                                                                       | boolean                                                                           | true                                               |
| contentEvents   | 内容事件绑定（格式是{key:function}，其中 key 为显示内容中 dom 元素的 className+事件名称，如：confirmButton.click）                                                                                 | {key:function(evt, markerInstance, infoWindowInstance)}                           | {}                                                 |

### 自定义信息窗口 SimpleInfoWindow

| 参数            | 说明                                                                                                                                                                                               | 类型                                                                              | 默认值                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------- |
| children        | 设置信息窗口内容。支持 HTML 内容。 content 参数支持传入 DOM 结点                                                                                                                                   | string\|node                                                                      | -                                                  |
| offset          | 信息窗位置偏移值。默认情况下在地图上打开的信息窗底端的尖角将指向其地理坐标，在标注上打开的信息窗底端尖角的位置取决于标注所用图标的 infoWindowOffset 属性值，您可以为信息窗添加偏移量来改变默认位置 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(0, 43)                               |
| boxClass        | 定义 infoBox 的 class                                                                                                                                                                              | string                                                                            | 'ant-map-maplabel'                                 |
| boxStyle        | 定义 infoBox 的 style,此项会覆盖 boxClass                                                                                                                                                          | object                                                                            | {}                                                 |
| closeIconMargin | 关闭按钮的 margin                                                                                                                                                                                  | string                                                                            | '2px'                                              |
| closeIconUrl    | 关闭按钮的 url 地址                                                                                                                                                                                | string                                                                            | '//cdncs.101.com/v0.1/static/fish/image/blank.gif' |
| enableAutoPan   | 是否启动自动平移功能                                                                                                                                                                               | boolean                                                                           | true                                               |
| align           | 基于哪个位置进行定位，取值为[INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM]                                                                                                                                     | [INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM]                                                | INFOBOX_AT_TOP                                     |
| show            | 是否显示组件                                                                                                                                                                                       | boolean                                                                           | true                                               |
| contentEvents   | 内容事件绑定（格式是{key:function}，其中 key 为显示内容中 dom 元素的 className+事件名称，如：confirmButton.click）                                                                                 | {key:function(evt, markerInstance, infoWindowInstance)}                           | {}                                                 |

### 折线 Polyline

| 参数            | 说明                                      | 类型                                                                                 | 默认值  |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------------------------ | ------- |
| points          | 设置折线的点数组，必填                    | [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0)[] | -       |
| strokeColor     | 折线颜色                                  | string                                                                               | 'blue'  |
| strokeWeight    | 折线的宽度，以像素为单位                  | number                                                                               | 2       |
| strokeOpacity   | 折线的透明度，取值范围 0 - 1              | number                                                                               | 0.5     |
| strokeStyle     | 折线的样式，solid 或 dashed               | string                                                                               | 'solid' |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物 | boolean                                                                              | true    |
| enableEditing   | 是否启用线编辑                            | boolean                                                                              | false   |
| enableClicking  | 是否响应点击事件                          | boolean                                                                              | true    |
| show            | 是否显示组件                              | boolean                                                                              | true    |

### 多边形 Polygon

| 参数            | 说明                                             | 类型                                                                                 | 默认值  |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ | ------- |
| points          | 设置多边型的点数组，必填                         | [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0)[] | -       |
| strokeColor     | 边线颜色                                         | string                                                                               | 'blue'  |
| fillColor       | 填充颜色。当参数为空时，折线覆盖物将没有填充效果 | string                                                                               | 'white' |
| strokeWeight    | 边线的宽度，以像素为单位                         | number                                                                               | 2       |
| strokeOpacity   | 边线的透明度，取值范围 0 - 1                     | number                                                                               | 0.5     |
| fillOpacity     | 填充的透明度，取值范围 0 - 1                     | number                                                                               | 0.5     |
| strokeStyle     | 边线的样式，solid 或 dashed                      | string                                                                               | 'solid' |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物        | boolean                                                                              | true    |
| enableEditing   | 是否启用线编辑                                   | boolean                                                                              | false   |
| enableClicking  | 是否响应点击事件                                 | boolean                                                                              | true    |
| show            | 是否显示组件                                     | boolean                                                                              | true    |

### 圆 Circle

| 参数            | 说明                                                 | 类型                                                                               | 默认值  |
| --------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------- | ------- |
| center          | 设置圆形的中心点坐标，必填                           | [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) | -       |
| radius          | 设置圆形的半径，单位为米，必填                       | number                                                                             | -       |
| strokeColor     | 圆形边线颜色                                         | string                                                                             | 'blue'  |
| fillColor       | 圆形填充颜色。当参数为空时，折线覆盖物将没有填充效果 | string                                                                             | 'white' |
| strokeWeight    | 圆形边线的宽度，以像素为单位                         | number                                                                             | 2       |
| strokeOpacity   | 圆形边线的透明度，取值范围 0 - 1                     | number                                                                             | 0.5     |
| fillOpacity     | 圆形填充的透明度，取值范围 0 - 1                     | number                                                                             | 0.5     |
| strokeStyle     | 圆形边线的样式，solid 或 dashed                      | string                                                                             | 'solid' |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物            | boolean                                                                            | true    |
| enableEditing   | 是否启用线编辑                                       | boolean                                                                            | false   |
| enableClicking  | 是否响应点击事件                                     | boolean                                                                            | true    |
| show            | 是否显示组件                                         | boolean                                                                            | true    |

### 文本标注 Label

| 参数            | 说明                                                                                                                                                                                                                                                                     | 类型                                                                               | 默认值 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------ |
| children        | 设置文本标注的内容。支持 HTML 字符串                                                                                                                                                                                                                                     | string                                                                             | -      |
| style           | 设置文本标注样式，该样式将作用于文本标注的容器元素上。其中 styles 为 JavaScript 对象常量，比如： setStyle({ color : "red", fontSize : "12px" }) 注意：如果 css 的属性名中包含连字符，需要将连字符去掉并将其后的字母进行大写处理，例如：背景色属性要写成：backgroundColor | Object                                                                             | -      |
| title           | 设置文本标注的标题，当鼠标移至标注上时显示此标题                                                                                                                                                                                                                         | string                                                                             | -      |
| zIndex          | 设置覆盖物的 zIndex                                                                                                                                                                                                                                                      | number                                                                             | -      |
| offset          | 文本标注的位置偏移值                                                                                                                                                                                                                                                     | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)  | -      |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物                                                                                                                                                                                                                                | boolean                                                                            | true   |
| position        | 指定文本标注的地理位置，没有放到 Marker 的 children 时，必填                                                                                                                                                                                                             | [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) | -      |
| show            | 是否显示组件                                                                                                                                                                                                                                                             | boolean                                                                            | true   |

### 标注图标 MarkerIcon

| 参数             | 说明                                                                                               | 类型                                                                              | 默认值 |
| ---------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------ |
| imageUrl         | 设置图片资源的地址                                                                                 | string                                                                            | -      |
| imageSize        | 图标所用的图片的大小，此功能的作用等同于 CSS 中的 background-size 属性。可用于实现高清屏的高清效果 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | -      |
| size             | 图标可视区域的大小                                                                                 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | -      |
| anchor           | 信息窗口定位锚点。开启信息窗口时，信息窗口底部尖角相对于图标左上角的位置，默认等于图标的 anchor    | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | -      |
| imageOffset      | 图片相对于可视区域的偏移值                                                                         | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | -      |
| infoWindowAnchor | 信息窗口定位锚点。开启信息窗口时，信息窗口底部尖角相对于图标左上角的位置，默认等于图标的 anchor    | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | -      |
| show             | 是否显示组件                                                                                       | boolean                                                                           | true   |

### 控件基类 MapControl

| 参数   | 说明                 | 类型                                                                                       | 默认值 |
| ------ | -------------------- | ------------------------------------------------------------------------------------------ | ------ |
| anchor | 设置控件停靠的位置   | [ControlAnchor](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | -      |
| offset | 设置控件停靠的偏移量 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)          | -      |
| show   | 是否显示控件         | boolean                                                                                    | true   |

### 比例尺控件 ScaleControl

| 参数   | 说明                 | 类型                                                                                       | 默认值                  |
| ------ | -------------------- | ------------------------------------------------------------------------------------------ | ----------------------- |
| anchor | 设置控件停靠的位置   | [ControlAnchor](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_LEFT |
| offset | 设置控件停靠的偏移量 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)          | new BMap.Size(112, 26)  |
| show   | 是否显示控件         | boolean                                                                                    | true                    |

### 缩放平移控件 NavigationControl

| 参数              | 说明                 | 类型                                                                                               | 默认值                        |
| ----------------- | -------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------- |
| anchor            | 设置控件停靠的位置   | [ControlAnchor](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1)         | BMAP_ANCHOR_TOP_LEFT          |
| offset            | 设置控件停靠的偏移量 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)                  | new BMap.Size(10, 10)         |
| show              | 是否显示控件         | boolean                                                                                            | true                          |
| type              | 设置控件停靠的位置   | [NavigationControlType](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b4) | BMAP_NAVIGATION_CONTROL_LARGE |
| showZoomInfo      | 是否显示级别提示信息 | boolean                                                                                            | true                          |
| enableGeolocation | 控件是否集成定位功能 | boolean                                                                                            | false                         |

### 版权信息控件 CopyrightControl

| 参数      | 说明                 | 类型                                                                                       | 默认值                   |
| --------- | -------------------- | ------------------------------------------------------------------------------------------ | ------------------------ |
| anchor    | 设置控件停靠的位置   | [ControlAnchor](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_RIGHT |
| offset    | 设置控件停靠的偏移量 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)          | new BMap.Size(5, 2)      |
| show      | 是否显示控件         | boolean                                                                                    | true                     |
| copyright | 添加版权信息         | [Copyright](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b14)    | -                        |

### 地图定位控件 GeolocationControl

| 参数               | 说明                         | 类型                                                                                       | 默认值                                                                                             |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| anchor             | 设置控件停靠的位置           | [ControlAnchor](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_LEFT                                                                            |
| offset             | 设置控件停靠的偏移量         | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)          | new BMap.Size(0, 50)                                                                               |
| show               | 是否显示控件                 | boolean                                                                                    | true                                                                                               |
| showAddressBar     | 是否显示定位信息面板         | boolean                                                                                    | true                                                                                               |
| enableAutoLocation | 添加控件时是否进行定位       | boolean                                                                                    | false                                                                                              |
| locationIcon       | 自定义定位中心点的 Icon 样式 | [Icon](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b5)          | [success-40x40.png](http://api0.map.bdimg.com/images/geolocation-control/mobile/success-40x40.png) |

### 切换地图类型控件 MapTypeControl

| 参数     | 说明                                                                                                   | 类型                                                                                             | 默认值                          |
| -------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------- |
| anchor   | 设置控件停靠的位置                                                                                     | [ControlAnchor](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1)       | BMAP_ANCHOR_TOP_LEFT            |
| offset   | 设置控件停靠的偏移量                                                                                   | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)                | new BMap.Size(10, 10)           |
| show     | 是否显示控件                                                                                           | boolean                                                                                          | true                            |
| type     | 控件样式                                                                                               | [MapTypeControlType](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b17) | BMAP_MAPTYPE_CONTROL_HORIZONTAL |
| mapTypes | 控件展示的地图类型，默认为普通图、卫星图、卫星加路网混合图和三维图。通过此属性可配置控件展示的地图类型 | [MapType](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b4)[]           | 全部类型                        |

### 缩略地图控件 OverviewMapControl

| 参数   | 说明                           | 类型                                                                                       | 默认值                   |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------ |
| anchor | 设置控件停靠的位置             | [ControlAnchor](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_RIGHT |
| offset | 设置控件停靠的偏移量           | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)          | new BMap.Size(0, 0)      |
| show   | 是否显示控件                   | boolean                                                                                    | true                     |
| size   | 设置缩略地图的大小             | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)          | new BMap.Size(150, 150)  |
| isOpen | 缩略地图添加到地图后的开合状态 | boolean                                                                                    | false                    |

### 切换至全景地图控件 PanoramaControl

| 参数   | 说明                 | 类型                                                                                       | 默认值                   |
| ------ | -------------------- | ------------------------------------------------------------------------------------------ | ------------------------ |
| anchor | 设置控件停靠的位置   | [ControlAnchor](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_RIGHT |
| offset | 设置控件停靠的偏移量 | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)          | new BMap.Size(0, 0)      |
| show   | 是否显示控件         | boolean                                                                                    | true                     |

### 自定义控件 CustomControl

| 参数     | 说明                                  | 类型                                                                                       | 默认值                |
| -------- | ------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------- |
| anchor   | 设置控件停靠的位置                    | [ControlAnchor](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_TOP_LEFT  |
| offset   | 设置控件停靠的偏移量                  | [Size](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3)          | new BMap.Size(10, 10) |
| show     | 是否显示控件                          | boolean                                                                                    | true                  |
| children | 设置自定义控件内容。支持传入 DOM 结点 | string\|node                                                                               | -                     |

### 位置检索 LocalSearch

| 参数             | 说明                                                                                                                                                                                                                                                               | 类型                                                                                                | 默认值   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | -------- |
| location         | 表示检索区域，其类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定，且搜索结果的标注将自动加载到地图上，并支持调整地图视野层级；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会优先在该城市内进行 | Map \| [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) \| string | Map 实例 |
| renderOptions    | 结果呈现设置                                                                                                                                                                                                                                                       | [RenderOptions](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a7b3)          | -        |
| onMarkersSet     | 标注添加完成后的回调函数。 参数： pois: Array，通过 marker 属性可得到其对应的标注                                                                                                                                                                                  | function                                                                                            | -        |
| onInfoHtmlSet    | 标注气泡内容创建后的回调函数。 参数： poi: LocalResultPoi，通过其 marker 属性可得到当前的标注。 html: HTMLElement，气泡内的 Dom 元素                                                                                                                               | function                                                                                            | -        |
| onResultsHtmlSet | 结果列表添加完成后的回调函数。 参数： container: HTMLElement，结果列表所用的 HTML 元素                                                                                                                                                                             | function                                                                                            | -        |
| pageCapacity     | 结果列表添加完成后的回调函数。 参数： container: HTMLElement，结果列表所用的 HTML 元素                                                                                                                                                                             | number                                                                                              | -        |
| onSearchComplete | 检索完成后的回调函数。 参数：results: LocalResult 或 Array 如果是多关键字检索，回调函数参数返回一个 LocalResult 的数组，数组中的结果顺序和检索中多关键字数组中顺序一致                                                                                             | function                                                                                            | -        |
| searchOption     | forceLocal 表示是否将搜索范围约束在当前城市，customData 表示检索 lbs 云服务的数据                                                                                                                                                                                  | {forceLocal:Boolean, customData:CustomData}                                                         | -        |
| keyword          | 检索词变化时发起检索。当 keyword 为数组时将同时执行多关键字的查询，最多支持 10 个关键字。                                                                                                                                                                          | string\|string[]                                                                                    | -        |

### 结果提示及自动完成类 Autocomplete

| 参数             | 说明                                                                                                                                                                                                                                                                                                                                   | 类型                                                                                                | 默认值   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------- |
| location         | 表示检索区域，其类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定，且搜索结果的标注将自动加载到地图上，并支持调整地图视野层级；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会优先在该城市内进行                                                                     | Map \| [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) \| string | Map 实例 |
| types            | 返回数据类型。两种设置方式，第一种为默认值（即设置值为空），将返回所有数据。如地图初始化为北京，在输入框中输入“小”，输入框下会出现包含“小”关键字的多种类型（如餐饮、地名等）的提示词条。第二种设置值为"city"，将返回省市区县乡镇街道地址类型数据。如地图初始化为北京，在输入框中输入“小”，输入框下会出现“小金县”的地点名称类的提示词条 | string[]                                                                                            | -        |
| onSearchComplete | 检索完成后的回调函数。 参数：results: LocalResult 或 Array 如果是多关键字检索，回调函数参数返回一个 LocalResult 的数组，数组中的结果顺序和检索中多关键字数组中顺序一致                                                                                                                                                                 | function                                                                                            | -        |
| input            | 文本输入框元素或其 id                                                                                                                                                                                                                                                                                                                  | string \| HTMLElement                                                                               | -        |

### 调起百度地图基类 BaseMapLink

下列所有 mapLink 组件都有这些参数。src 固定为“网龙网络控股有限公司”，output 固定为“html”。

| 参数       | 说明                                                                                                                                                                                                                       | 类型         | 默认值    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------- |
| children   | 内容，必填                                                                                                                                                                                                                 | stirng\|node | -         |
| className  | 链接节点样式类名称                                                                                                                                                                                                         | string       | -         |
| style      | 链接节点样式                                                                                                                                                                                                               | Object       | -         |
| target     | [特殊的文档重定向操作](http://www.w3school.com.cn/tags/att_a_target.asp)，可选值：\_blank,\_self,\_parent,\_top                                                                                                            | string       | '\_blank' |
| coord_type | 坐标类型，可选参数。默认为 bd09 经纬度坐标。允许的值为 bd09ll、bd09mc、gcj02、wgs84。bd09ll 表示百度经纬度坐标，bd09mc 表示百度墨卡托坐标，gcj02 表示经过国测局加密的坐标，wgs84 表示 gps 获取的坐标。MapLinkPano 无此参数 | string       | -         |
| zoom       | 展现地图的级别，默认为视觉最优级别。MapLinkPano 无此参数                                                                                                                                                                   | number       | -         |

### 地图标点功能 MapLinkMarker

调用该接口可调起 PC 或 web 地图，且在指定坐标点上显示点的名称和内容信息。

| 参数     | 说明                                              | 类型   | 默认值 |
| -------- | ------------------------------------------------- | ------ | ------ |
| location | 标注点经纬度，参数格式：lat<纬度>,lng<经度>，必填 | stirng | -      |
| title    | 标注点显示标题，必填                              | string | -      |
| content  | 标注点显示内容 ，必填                             | string | -      |

### 地址解析和反向地址解析（地址查询） MapLinkGeocoder

* 地址解析：调用该接口可以在调起百度地图时，当前页面显示地址对应的坐标点。
* 反向地址解析（地址查询）：调用该接口可调起 PC 或 Web 百度地图，经过逆地理编码后，以标注形式显示位置和地址信息。

| 参数     | 说明                                                            | 类型   | 默认值 |
| -------- | --------------------------------------------------------------- | ------ | ------ |
| location | 标注点经纬度，参数格式：lat<纬度>,lng<经度>，address 为空时必填 | stirng | -      |
| address  | 地址名称，location 为空时必填                                   | string | -      |

### POI（地点）搜索 MapLinkPlaceSearch

调用该接口可调起 PC 或 Web 百度地图，通过本地检索服务，以列表形式显示符合查询条件的点。

选择方式：地点搜索限定范围可以由 region、bounds 和 location + radius 方式进行，其中 bounds 优先级最高、region 优先级最低（与 web 服务保持一致）

| 参数     | 说明                                                | 类型   | 默认值 |
| -------- | --------------------------------------------------- | ------ | ------ |
| query    | 关键词，必填                                        | stirng | -      |
| region   | 城市名或县名                                        | stirng | -      |
| location | 中心点经纬度。参数格式：lat<纬度>,lng<经度>         | stirng | -      |
| radius   | 检索半径                                            | number | -      |
| bounds   | 视野范围。参数格式：lat,lng<左下角>,lat,lng<右上角> | string | -      |

### POI 详情页展示 MapLinkPlaceDetail

调用该接口可调起 PC 或 Web 百度地图，通过 POI 详情查询服务，显示指定点的详情信息。

| 参数 | 说明            | 类型   | 默认值 |
| ---- | --------------- | ------ | ------ |
| uid  | POI 的 ID，必填 | stirng | -      |

### 公交、地铁线路查询 MapLinkLine

调用该接口可调起 PC 或 Web 百度地图，通过线路查询服务，以列表形式显示线路信息。

| 参数   | 说明               | 类型   | 默认值 |
| ------ | ------------------ | ------ | ------ |
| region | 城市名或县名，必填 | stirng | -      |
| name   | 线路名称，必填     | stirng | -      |

### 公交、驾车、步行路线规划 MapLinkDirection

调用该接口可调起 PC 或 Web 百度地图，通过线路查询服务，以列表形式显示公交、驾车、步行路线规划。

origin 三种格式：

1、名称：天安门

2、经纬度：39.98871<纬度>,116.43234<经度>。

3、名称和经纬度：name:天安门|latlng:39.98871,116.43234

| 参数               | 说明                                                                                                                         | 类型   | 默认值 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------ | ------ |
| origin             | 起点名称或经纬度，或者可同时提供名称和经纬度，此时经纬度优先级高，将作为导航依据，名称只负责展示。必填                       | stirng | -      |
| destination        | 终点名称或经纬度，或者可同时提供名称和经纬度，此时经纬度优先级高，将作为导航依据，名称只负责展示。必填                       | stirng | -      |
| mode               | 导航模式，固定为 transit、driving、walking，分别表示公交、驾车和步行。必填                                                   | stirng | -      |
| region             | 城市名或县名。当给定 region 时，认为起点和终点都在同一城市，除非单独给定起点 origin_region 或终点的城市 destination_region。 | stirng | -      |
| origin_region      | 起点所在城市或县。和 destination_region 一起使用。                                                                           | stirng | -      |
| destination_region | 终点所在城市或县。和 dorigin_region 一起使用。                                                                               | stirng | -      |

### 全景服务 MapLinkPano

调用该接口可以在调起百度地图 api 时，当前页面显示对应的全景点。

| 参数 | 说明                                                                         | 类型   | 默认值                 |
| ---- | ---------------------------------------------------------------------------- | ------ | ---------------------- |
| ak   | 应用秘钥，必填                                                               | stirng | -                      |
| x    | 经度，和 y 一起使用，显示该经纬周围最近的全景点。xy/pid/uid 三组参数必选一组 | number | -                      |
| y    | 维度，和 x 一起使用，显示该经纬周围最近的全景点。xy/pid/uid 三组参数必选一组 | number | -                      |
| pid  | 显示该 id 的全景点。xy/pid/uid 三组参数必选一组                              | stirng | -                      |
| uid  | 显示该 poi 的全景点。xy/pid/uid 三组参数必选一组                             | stirng | -                      |
| h    | 水平角度                                                                     | number | 默认为该场景点最佳角度 |
| p    | 垂直视角                                                                     | number | 默认为该场景点最佳角度 |
| nc   | 是否显示鱼骨控件。1 开启，0 关闭                                             | number | 1                      |
| lc   | 是否显示拓扑箭头。1 开启，0 关闭                                             | number | 1                      |
| issc | 是否显示内景场景切换控件。1 开启，0 关闭                                     | number | 1                      |
| ac   | 是否显示相册控件。1 开启，0 关闭                                             | number | 1                      |
| z    | 场景缩放级别                                                                 | number | 3                      |
| iec  | 是否显示内部全景出口。1 开启，0 关闭                                         | number | 1                      |
