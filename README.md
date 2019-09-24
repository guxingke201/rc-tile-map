# 地图

---

基于百度 Javascript API 的地图组件

## 浏览器支持

| ![IE](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png) | ![Chrome](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png) | ![Firefox](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png) | ![Opera](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png) | ![Safari](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png) |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| IE 8+ ✔                                                                                            | Chrome 31.0+ ✔                                                                                           | Firefox 31.0+ ✔                                                                                            | Opera 30.0+ ✔                                                                                          | Safari 7.0+ ✔                                                                                            |

## 本地运行

```
npm install
npm run start
```

### 地图初始化基础操作

```jsx
import { Map, NDMap } from "@gem-mine/rc-tile-map";
let nowCenter = new NDMap.Point(116.332782, 40.007978);
class App extends React.Component {
  mapNow;
  constructor(props) {
    super(props);
    this.state = {
      center: "北京",
      zoom: 16,
      minZoom: 1,
      maxZoom: 17,
      mapType: BMAP_HYBRID_MAP,
      enableHighResolution: true,
      enableAutoResize: true,
      enableMapClick: true
    };
  }
  onClickMap = ({ type, target, point, pixel, overlay }) => {
    console.log("type:", type);
    console.log("target:", target);
    console.log("point:", point);
    console.log("pixel:", pixel);
    console.log("overlay:", overlay);
  };
  render() {
    return (
      <div className="tilemap-container-demo">
        <Map
          setComponentInstance={mapNow => {
            this.mapNow = mapNow;
          }}
          {...this.state}
          onClick={this.onClickMap}
          className="tilemap-demo"
          style={{ height: 501 }}
        />
        <button
          className="button-demo"
          onClick={() => {
            this.setState({
              center: new NDMap.Point(
                this.mapNow.getCenter().lng + 0.0005,
                this.mapNow.getCenter().lat
              )
            });
          }}
        >
          更新地图中心
        </button>
        <button
          className="button-demo"
          onClick={() => this.setState({ zoom: this.mapNow.getZoom() - 1 })}
        >
          更新缩放级别
        </button>
        <button
          className="button-demo"
          onClick={() =>
            this.setState({
              viewport: {
                center: new NDMap.Point(
                  this.mapNow.getCenter().lng + 0.0005,
                  40.007978
                ),
                zoom: this.mapNow.getZoom() - 1
              }
            })
          }
        >
          更新视角
        </button>
        <button
          className="button-demo"
          onClick={() => this.setState({ maxZoom: 18 })}
        >
          更新最大缩放级别
        </button>
        <button
          className="button-demo"
          onClick={() => this.setState({ minZoom: 3 })}
        >
          更新最小缩放级别
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.tilemap-demo {
  width: 100%;
  height: 500px;
}
.tilemap-container-demo .button-demo {
  margin: 5px;
}
```

### 叠加图层

```jsx
import { Map, NDMap, TileLayer } from "@gem-mine/rc-tile-map";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTileLayer: false,
      center: new NDMap.Point(116.332782, 40.007978),
      zoom: 16
    };
  }
  getTilesUrl = (tileCoord, zoom) => {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return `//lbsyun.baidu.com/jsdemo/demo/tiles/${zoom}/tile${x}_${y}.png`; //根据当前坐标，选取合适的瓦片图
  };
  onClickAdd = () => {
    this.setState({
      showTileLayer: true
    });
  };
  onClickDel = () => {
    this.setState({
      showTileLayer: false
    });
  };
  render() {
    return (
      <section className="tilemap-container-demo">
        <Map
          disableDoubleClickZoom
          disableScrollWheelZoom
          center={this.state.center}
          zoom={this.state.zoom}
          className="tilemap-demo"
        >
          <TileLayer zIndex={3} getTilesUrl={this.getTilesUrl} />
          <TileLayer
            zIndex={1}
            tileUrlTemplate="//lbsyun.baidu.com/jsdemo/demo/tiles/{Z}/tile{X}_{Y}.png"
          />
          {this.state.showTileLayer ? (
            <TileLayer
              zIndex={4}
              tileUrlTemplate="//lbsyun.baidu.com/jsdemo/img/border.png"
            />
          ) : null}
        </Map>
        <button className="button-demo" onClick={this.onClickAdd}>
          添加网格图层
        </button>
        <button className="button-demo" onClick={this.onClickDel}>
          删除网格图层
        </button>
      </section>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

### 添加覆盖物


添加覆盖物：标注（Marker）,信息窗口（InfoWindow）,自定义信息窗口（InfoBox）,简单信息窗口（SimpleInfoWindow）,折线（Polyline），多边形（Polygon），圆（Circle），文本标注（Label），图标（MarkerIcon）

```jsx
import {
  Map,
  NDMap,
  Marker,
  InfoWindow,
  InfoBox,
  Polyline,
  Polygon,
  Circle,
  Label,
  MarkerIcon
} from "@gem-mine/rc-tile-map";
var pStart = new NDMap.Point(116.392214, 39.918985);
var pEnd = new NDMap.Point(116.41478, 39.911901);
class App extends React.Component {
  markerValue;
  state = {
    common: {
      strokeColor: "red",
      strokeWeight: 3,
      strokeOpacity: 0.9,
      strokeStyle: "dashed",
      enableEditing: false,
      enableMassClear: true,
      enableClicking: true
    },

    marker: {
      enableMassClear: true,
      enableDragging: true,
      enableClicking: true,
      raiseOnDrag: true,
      draggingCursor: "move",
      rotation: -30,
      title: "marker demo",
      point: new NDMap.Point(116.404, 39.915)
    },
    showMapInfoWindow: false,
    infoWindowPoint: new NDMap.Point(116.404, 39.915),
    label: {
      style: {
        color: "red",
        fontSize: "12px",
        lineHeight: "20px",
        borderColor: "#ddd",
        boxShadow: "0 2px 6px #aaa",
        padding: "10px",
        borderRadius: "0",
        fontFamily: "微软雅黑"
      },
      offset: new NDMap.Size(20, -10)
    },
    markerIcon: {
      imageUrl: "//api0.map.bdimg.com/images/marker_red_sprite.png",
      size: new NDMap.Size(19, 25)
    },
    infoBox: {
      boxStyle: {
        width: "270px",
        height: "300px"
      },
      closeIconMargin: "1px 1px 0 0"
    }
  };
  onClickMap = ({ point, target, overlay }) => {
    // 点击地图是overlay是null,点击覆盖物不是null
    if (!overlay) {
      this.setState({ infoWindowPoint: point, showMapInfoWindow: true });
    }
  };
  render() {
    return (
      <div className="tilemap-container-demo">
        <Map className="tilemap-demo" zoom={15} onClick={this.onClickMap}>
          <Label
            position={new NDMap.Point(116.417854, 39.921988)}
            title="地图label"
            {...this.state.label}
          >
            欢迎使用百度地图，这是一个简单的文本标注哦~
          </Label>
          {this.state.showMapInfoWindow ? (
            <InfoWindow
              position={this.state.infoWindowPoint}
              enableCloseOnClick={false}
              title={this.state.infoWindowPoint.lat.toString()}
            >
              <span>{JSON.stringify(this.state.infoWindowPoint)}</span>
            </InfoWindow>
          ) : null}
          <Marker
            {...this.state.marker}
            setComponentInstance={markerValue => {
              this.markerValue = markerValue;
            }}
          >
            <InfoWindow title="天安门">
              <div className="global-maplabel-confirm">
                <p className="global-maplabel-text-main">xx</p>
                <p className="global-maplabel-text-sub">福州鼓楼</p>
              </div>
            </InfoWindow>
            <Label title="覆盖物label" {...this.state.label}>
              {`<p class="global-maplabel-text-main">xx</p><p class="global-maplabel-text-sub">福州鼓楼</p>`}
            </Label>
          </Marker>
          <Polyline
            points={[
              new NDMap.Point(116.399, 39.91),
              new NDMap.Point(116.405, 39.92),
              new NDMap.Point(116.425, 39.9)
            ]}
            {...this.state.common}
          />
          <Polygon
            points={[
              new NDMap.Point(116.387112, 39.920977),
              new NDMap.Point(116.385243, 39.913063),
              new NDMap.Point(116.394226, 39.917988),
              new NDMap.Point(116.401772, 39.921364),
              new NDMap.Point(116.41248, 39.927893)
            ]}
            fillColor="yellow"
            fillOpacity={0.3}
            {...this.state.common}
          />
          <Polygon
            points={[
              new NDMap.Point(pStart.lng, pStart.lat),
              new NDMap.Point(pEnd.lng, pStart.lat),
              new NDMap.Point(pEnd.lng, pEnd.lat),
              new NDMap.Point(pStart.lng, pEnd.lat)
            ]}
            fillColor="yellow"
            fillOpacity={0.3}
            {...this.state.common}
          />
          <Circle
            center={new NDMap.Point(116.404, 39.915)}
            radius={500}
            fillColor="yellow"
            fillOpacity={0.3}
            {...this.state.common}
          />
          <Marker
            point={new NDMap.Point(116.404, 39.908)}
            icon={
              new NDMap.Icon("//lbsyun.baidu.com/jsdemo/img/fox.gif", {
                size: new NDMap.Size(300, 157)
              })
            }
          >
            <MarkerIcon {...this.state.markerIcon} />
            <InfoBox {...this.state.infoBox}>
              <div className="infoBoxContent">
                <div className="title">
                  <strong>中海雅园</strong>
                  <span className="price">均价43000</span>
                </div>
                <div className="list">
                  <ul>
                    <li>
                      <div className="left">
                        <img src="//api.map.baidu.com/library/InfoBox/1.2/examples/house3.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="//map.baidu.com">
                          中海雅园南北通透四居室
                        </a>
                        <p>4室2厅，205.00平米，3层</p>
                      </div>
                      <div className="rmb">760万</div>
                    </li>
                    <li>
                      <div className="left">
                        <img src="//api.map.baidu.com/library/InfoBox/1.2/examples/house1.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="//map.baidu.com">
                          中海雅园四居室还带保姆间
                        </a>
                        <p>2室1厅，112.00平米，16层</p>
                      </div>
                      <div className="rmb">300万</div>
                    </li>
                    <li>
                      <div className="left">
                        <img src="//api.map.baidu.com/library/InfoBox/1.2/examples/house2.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="//map.baidu.com">
                          《有钥匙 随时看》花园水系
                        </a>
                        <p>3室2厅，241.00平米，16层</p>
                      </div>
                      <div className="rmb">400万</div>
                    </li>
                    <li>
                      <div className="left">
                        <img src="//api.map.baidu.com/library/InfoBox/1.2/examples/house3.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="//map.baidu.com">
                          富力城D区正规楼王大三居
                        </a>
                        <p>3室3厅，241.00平米，17层</p>
                      </div>
                      <div className="rmb">600万</div>
                    </li>
                    <li className="last">
                      <div className="left">
                        <img src="//api.map.baidu.com/library/InfoBox/1.2/examples/house1.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="//map.baidu.com">
                          富力城豪，身份人士的象征
                        </a>
                        <p>4室2厅，213.90平米，25层</p>
                      </div>
                      <div className="rmb">700万</div>
                    </li>
                  </ul>
                </div>
              </div>
            </InfoBox>
          </Marker>
        </Map>
        <button
          className="button-demo"
          onClick={() =>
            this.setState({
              marker: {
                ...this.state.marker,
                enableDragging: !this.state.marker.enableDragging
              }
            })
          }
        >
          {`更新标注：拖拽` + this.state.marker.enableDragging}
        </button>
        <button
          className="button-demo"
          onClick={() =>
            this.setState({
              marker: {
                ...this.state.marker,
                point: new NDMap.Point(116.41, 39.915)
              }
            })
          }
        >
          更新标注：位置
        </button>
        <button
          className="button-demo"
          onClick={() =>
            this.setState({
              common: { ...this.state.common, strokeColor: "blue" }
            })
          }
        >
          更新颜色
        </button>
        <button
          className="button-demo"
          onClick={() =>
            this.setState({
              common: {
                ...this.state.common,
                enableEditing: !this.state.common.enableEditing
              }
            })
          }
        >
          {"更新编辑状态" + this.state.common.enableEditing}
        </button>
        <button
          className="button-demo"
          onClick={() =>
            this.setState({
              markerIcon: {
                ...this.state.markerIcon,
                imageUrl: "//lbsyun.baidu.com/jsdemo/img/fox.gif",
                size: new NDMap.Size(300, 157)
              }
            })
          }
        >
          更新图标
        </button>
        <button
          className="button-demo"
          onClick={() => {
            console.log("this.markerValue", this.markerValue);
            alert(JSON.stringify(this.markerValue.getPosition()));
          }}
        >
          获取标注当前位置
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.global-maplabel-text-main {
  line-height:18px;
  font-size:12px;
  color:#666;
}
.global-maplabel-text-sub {
  line-height:18px;
  font-size:12px;
  color:#bbb
}
.infoBoxContent {
  font-size: 12px;
}
.infoBoxContent .title {
  background: url(//api.map.baidu.com/library/InfoBox/1.2/examples/title.jpg)
    no-repeat;
  height: 42px;
  width: 272px;
}
.infoBoxContent .title strong {
  font-size: 14px;
  line-height: 42px;
  padding: 0 10px 0 5px;
}
.infoBoxContent .title .price {
  color: #ffff00;
}
.infoBoxContent .list {
  width: 268px;
  border: solid 1px #4fa5fc;
  border-top: none;
  background: #fff;
  height: 260px;
}
.infoBoxContent .list ul {
  margin: 0;
  padding: 5px;
  list-style: none;
}
.infoBoxContent .list ul li {
  float: left;
  width: 255px;
  border-bottom: solid 1px #4fa5fc;
  padding: 2px 0;
}
.infoBoxContent .list ul .last {
  border: none;
}
.infoBoxContent .list ul img {
  width: 53px;
  height: 42px;
  margin-right: 5px;
}
.infoBoxContent .list ul p {
  padding: 0;
  margin: 0;
}
.infoBoxContent .left {
  float: left;
}
.infoBoxContent .rmb {
  float: right;
  color: #eb6100;
  font-size: 14px;
  font-weight: bold;
}
.infoBoxContent a {
  color: #0041d9;
  text-decoration: none;
}
```

### 添加控件

添加地图控件：比例尺控件（ScaleControl）,缩放平移控件（NavigationControl）,版权信息控件（CopyrightControl），地图定位控件（GeolocationControl）,切换地图类型控件（MapTypeControl）,缩略地图控件（OverviewMapControl），切换至全景地图控件（PanoramaControl）,自定义控件（CustomControl）。

```jsx
import {
  Map,
  NDMap,
  ScaleControl,
  NavigationControl,
  CopyrightControl,
  GeolocationControl,
  MapTypeControl,
  OverviewMapControl,
  PanoramaControl,
  CustomControl
} from "@gem-mine/rc-tile-map";
class App extends React.Component {
  mapNow;
  state = {
    common: {
      show: true
    }
  };
  onLocationSuccess = ({ point, addressComponent }) => {
    console.log("point:", point, "addressComponent:", addressComponent);
    // 定位成功事件
    var address = "";
    address += addressComponent.province;
    address += addressComponent.city;
    address += addressComponent.district;
    address += addressComponent.street;
    address += addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
  };
  render() {
    return (
      <div className="tilemap-container-demo">
        <Map
          setComponentInstance={mapNow => {
            this.mapNow = mapNow;
          }}
          className="tilemap-demo"
          zoom={15}
          onClick={this.onClickMap}
        >
          <ScaleControl
            {...this.state.common}
            offset={new NDMap.Size(112, 26)}
            anchor={BMAP_ANCHOR_BOTTOM_LEFT}
          />
          <NavigationControl {...this.state.common} enableGeolocation />
          <NavigationControl
            {...this.state.common}
            anchor={BMAP_ANCHOR_TOP_RIGHT}
            type={BMAP_NAVIGATION_CONTROL_SMALL}
          />
          <CopyrightControl
            {...this.state.common}
            anchor={BMAP_ANCHOR_BOTTOM_RIGHT}
            copyright={{
              id: 1,
              content:
                "<span style='background-color:white;'>版权说明：清华校园图片取自互联网</span>"
            }}
          />
          <GeolocationControl
            {...this.state.common}
            onLocationSuccess={this.onLocationSuccess}
          />
          <MapTypeControl
            {...this.state.common}
            offset={new NDMap.Size(100, 10)}
            type={BMAP_MAPTYPE_CONTROL_MAP}
          />
          <OverviewMapControl
            {...this.state.common}
            offset={new NDMap.Size(10, 20)}
          />
          <PanoramaControl
            {...this.state.common}
            offset={new NDMap.Size(0, 200)}
          />
          <CustomControl
            {...this.state.common}
            offset={new NDMap.Size(360, 10)}
          >
            <div
              onClick={() => {
                this.mapNow.setZoom(this.mapNow.getZoom() + 2);
              }}
            >
              放大两级
            </div>
          </CustomControl>
          <CustomControl
            {...this.state.common}
            offset={new NDMap.Size(450, 10)}
          >
            <div
              onClick={() => {
                this.mapNow.setZoom(this.mapNow.getZoom() - 2);
              }}
            >
              缩小两级
            </div>
          </CustomControl>
        </Map>
        <button
          className="button-demo"
          onClick={() =>
            this.setState({
              common: {
                ...this.state.common,
                show: !this.state.common.show
              }
            })
          }
        >
          显示隐藏
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
