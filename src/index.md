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

需要显示或获取空间数据的时候。

## API

```jsx
<Map
  center={this.state.center}
  zoom={this.state.zoom}
  className="tilemap-demo"
/>
```

### NDMap

相当于 BMap

### 共同的 API

以下 API 为 所有地图组件共享的 API。

| 参数                 | 说明                | 类型     | 默认值 |
| -------------------- | ------------------- | -------- | ------ |
| on\*                 | on+百度地图事件名称 | function | -      |
| setComponentInstance | 设置组件实例        | function | -      |

### Map

| 参数                   | 说明                                                | 类型                                                                                  | 默认值          |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------- |
| viewport               | 设置地图视野，相当于 center+zoom，viewport 优先生效 | [Viewport](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a0b3) | -               |
| center                 | 设置地图中心点                                      | [Point](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0)    | 北京            |
| zoom                   | 设置地图的缩放等级                                  | number                                                                                | 11              |
| minZoom                | 地图允许展示的最小级别                              | number                                                                                | -               |
| maxZoom                | 地图允许展示的最大级别                              | number                                                                                | -               |
| mapType                | 地图类型，默认为                                    | [MapType](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a5b0)  | BMAP_NORMAL_MAP |
| enableAutoResize       | 是否自动适应地图容器变化                            | boolean                                                                               | true            |
| enableMapClick         | 是否开启底图可点功能                                | boolean                                                                               | true            |
| disableScrollWheelZoom | 是否禁用滚轮放大缩小                                | boolean                                                                               | false           |
| disableDoubleClickZoom | 是否禁用双击放大                                    | boolean                                                                               | false           |
| className              | 地图平台容器节点样式类名称                          | string                                                                                | -               |
| id                     | 地图平台容器节点 ID                                 | string                                                                                | -               |
| style                  | 地图平台容器节点样式                                | object                                                                                | -               |

### TileLayer

| 参数            | 说明                                                                                                                                                                                                                                                                                                                          | 类型                                            | 默认值 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ |
| getTilesUrl     | 抽象。向地图返回地图图块的网址，图块索引由 tileCoord 的 x 和 y 属性在指定的缩放级别 zoom 提供。如果您在 TileLayerOptions 中提供了 tileUrlTemplate 参数，则可不实现此接口                                                                                                                                                      | function(tileCoord: Pixel, zoom: Number):string | -      |
| tileUrlTemplate | 指定图块网址模板，该模板可以针对每个图块请求而展开，以根据现有的图块坐标系引用唯一的图块。模板的格式应该为：http://yourhost/tile?x={X}&y={Y}&z={Z}.png 其中 X 和 Y 分别指纬度和经度图块坐标，Z 指缩放级别，比如： http://yourhost/tile?x=3&y=27&z=5.png 如果您没有提供图块网址模板，您需要实现 TileLayer.getTileUrl()抽象方法 | string                                          | -      |
| zIndex          | 图层的 zIndex                                                                                                                                                                                                                                                                                                                 | number                                          | -      |

### Marker

| 参数     | 说明                                                | 类型                                                                                  | 默认值 |
| -------- | --------------------------------------------------- | ------------------------------------------------------------------------------------- | ------ |
| viewport | 设置地图视野，相当于 center+zoom，viewport 优先生效 | [Viewport](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a0b3) | -      |
