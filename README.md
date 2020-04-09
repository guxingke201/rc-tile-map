# 地图

---

基于百度 Javascript API 的地图组件

## 何时使用

- 需要显示或获取空间数据的时候。

- 直接调起百度地图

## 浏览器支持

| ![IE](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png) | ![Chrome](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png) | ![Firefox](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png) | ![Opera](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png) | ![Safari](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png) |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| IE 9+ ✔                                                                                            | Chrome 31.0+ ✔                                                                                           | Firefox 31.0+ ✔                                                                                            | Opera 30.0+ ✔                                                                                          | Safari 7.0+ ✔                                                                                            |

## 安装

```bash
npm install rc-tile-map --save
```

## 运行

```bash
# 默认开启服务器，地址为 ：http://localhost:8000/

# 能在ie9+下浏览本站，修改代码后自动重新构建，且能在ie10+运行热更新，页面会自动刷新
npm run start

# 构建生产环境静态文件，用于发布文档
npm run site

# 构建lib及dist
npm run build

# 发布版本
npm run pub

```

## 代码演示

在线示例：https://guxingke201.github.io/rc-tile-map/site/

### 初始化地图

地图初始化基础操作

```jsx
import "rc-tile-map/lib/style/";
import { Map, NDMap } from "rc-tile-map";
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

叠加图层

```jsx
import { Map, NDMap, TileLayer } from "rc-tile-map";
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
} from "rc-tile-map";
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
} from "rc-tile-map";
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

### 检索相关

位置检索（LocalSearch）、结果提示及自动完成类（Autocomplete）

```jsx
import {
  Map,
  NDMap,
  CustomControl,
  AutocompleteMap,
  LocalSearch,
  Marker,
  MarkerIcon,
  SimpleInfoWindow,
  Label
} from "rc-tile-map";
import { Input, Button, Icon, Row, Col, Cascader, AutoComplete } from "antd";
const Option = AutoComplete.Option;
const Search = Input.Search;
const geoc = new NDMap.Geocoder();
let timer = null;
class App extends React.Component {
  mapNow;
  localSearchDiv;
  lastClickMarker;
  state = {
    hasSelect: false,
    keywordMap: null,
    keyword: null,
    mapState: {
      zoom: 15
    },
    markerState: {
      enableDragging: true
    },
    markerList: [],
    icon: {
      imageUrl: "//cdncs.101.com/v0.1/static/fish/image/markers_num.png"
    },
    label: {
      offset: new NDMap.Size(30, -15)
    },
    pointInfo: {
      point: null,
      title: "",
      region: "",
      address: ""
    },
    areaValue: "",
    areaValueCity: "",
    areaData: [
      {
        value: "浙江",
        label: "浙江",
        children: [
          {
            value: "杭州",
            label: "杭州"
          }
        ]
      },
      {
        value: "江苏",
        label: "江苏",
        children: [
          {
            value: "南京",
            label: "南京"
          }
        ]
      },
      {
        value: "福建",
        label: "福建",
        children: [
          {
            value: "福州",
            label: "福州"
          },
          {
            value: "莆田",
            label: "莆田"
          }
        ]
      }
    ],
    historyArray: ["福州市鼓楼区851大楼", "福州长乐", "福州亚太"],
    dataSource: []
  };
  componentDidMount() {
    this.setState({ dataSource: this.getOptions(this.state.historyArray) });
  }
  getTitle = (resultLoaction, firstPoint) => {
    let title = firstPoint.title;
    if (!title && resultLoaction && resultLoaction.surroundingPois && resultLoaction.surroundingPois.length > 0) {
      title = resultLoaction.surroundingPois[0].title;
    }
    return title || "未知地点";
  };
  updateMarkerItem = (uid, newPointInfo) => {
    this.setState({
      markerList: this.state.markerList.map(item => {
        if (item.uid === uid) {
          return { ...item, ...newPointInfo };
        } else {
          return item;
        }
      })
    });
  };
  setPositionInfo = (endPoint, uid) => {
    console.log("setPositionInfo endPoint:", endPoint);
    geoc.getLocation(endPoint.point, resultLoaction => {
      console.log("resultLoaction:", resultLoaction);
      const positionInfo = resultLoaction.addressComponents;
      this.updateMarkerItem(uid, {
        point: endPoint.point,
        address: resultLoaction.address,
        province: positionInfo.province,
        city: positionInfo.city,
        title: `${this.getTitle(resultLoaction, endPoint)}`
      });
    });
  };
  onClickItem = ({ type, target, item }) => {
    console.log("type:", type, "target:", target, "item:", item);
    // this.mapNow.clearOverlays();
    var positionInfo = item.value;
    this.setState({
      keywordMap:
        positionInfo.province + positionInfo.city + positionInfo.district + positionInfo.street + positionInfo.business
    });
  };
  onChangeKeyword = keyword => {
    console.log("onChangeKeyword keyword:", keyword);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.setState({
        keyword: keyword || "",
        dataSource: !keyword ? this.getOptions(this.state.historyArray) : [] //没有关键字时使用历史记录
      });
    }, 200);
  };
  onClickMapInputSearch = keywordMap => {
    this.setState({
      keywordMap
    });
  };
  onAreaChange = areaValueArray => {
    const areaValue = areaValueArray && areaValueArray.join("");
    const areaValueCity = areaValueArray && areaValueArray[areaValueArray.length - 1];
    this.setState({
      areaValue,
      areaValueCity
    });
    geoc.getPoint(
      areaValue,
      point => {
        if (point) {
          this.setState({
            mapState: {
              ...this.state.mapState,
              zoom: 11,
              center: point
            }
          });
        }
      },
      areaValueCity
    );
  };
  getOptions = historyArray => {
    if (!historyArray || historyArray.length === 0) {
      return [];
    }
    return historyArray
      .map((historyItem, index) => (
        <Option key={index} value={historyItem}>
          <span>{historyItem}</span>
        </Option>
      ))
      .concat([
        <Option disabled key="del" className="del-item">
          <Button
            type="font"
            onClick={() => {
              this.setState({ dataSource: [], historyArray: [] });
            }}
          >
            清空搜索历史
          </Button>
        </Option>
      ]);
  };
  formatSearchData = searchResults => {
    let rows = searchResults.getNumPois();
    if (rows > 10) {
      rows = 10;
    }
    return Array(rows)
      .fill(0)
      .map((item, index) => searchResults.getPoi(index))
      .filter(item => !!item);
  };
  getOptionsBySearchResults = searchResults => {
    const countResult = searchResults && searchResults.getNumPois();
    console.log("countResult:", countResult);
    if (!searchResults || countResult === 0) {
      return [
        <Option disabled key="empty" className="empty-item">
          <p className="global-search-empty-text">未找到相关地点</p>
          <p className="global-search-empty-text">您还可以：</p>
          <ul className="global-search-empty-list">
            <li>检查输入是否正确或者输入其他词</li>
            <li>
              在网页中查找“<a
                className="global-search-empty-strong"
                target="_blank"
                href={`//www.baidu.com/s?wd=${searchResults.keyword}`}
              >
                {searchResults.keyword}
              </a>”
            </li>
            <li>进行意见反馈</li>
          </ul>
        </Option>
      ];
    } else {
      return this.formatSearchData(searchResults).map((item, index) => {
        return (
          <Option key={index} value={`${item.city}${item.district}${item.business}`}>
            <span>{`${item.business} `}</span>
            <span style={{ color: "gray" }}>{`${item.city}${item.district}`}</span>
          </Option>
        );
      });
    }
  };
  getMarker(pointInfo) {
    return (
      <Marker
        key={pointInfo.uid}
        {...pointInfo.markerProps}
        onClick={() => {
          if (this.state.hasSelect) {
            return;
          }
          if (this.lastClickMarker) {
            this.updateMarkerItem(this.lastClickMarker.uid, {
              iconProps: {
                ...this.lastClickMarker.iconProps,
                size: new NDMap.Size(20, 28),
                imageOffset: new NDMap.Size(-20 * this.lastClickMarker.iconProps.index, 0)
              },
              infoWindowProps: { show: false },
              markerProps: {
                ...this.lastClickMarker.markerProps,
                offset: new NDMap.Size(0, -10)
              }
            });
          }
          this.lastClickMarker = pointInfo;
          this.updateMarkerItem(pointInfo.uid, {
            iconProps: {
              ...pointInfo.iconProps,
              size: new NDMap.Size(28, 40),
              imageOffset: new NDMap.Size(-28 * pointInfo.iconProps.index, -28)
            },
            infoWindowProps: { show: true },
            labelProps: { show: false },
            markerProps: {
              ...pointInfo.markerProps,
              offset: new NDMap.Size(-4, -22)
            }
          });
          this.setState({
            mapState: {
              ...this.state.mapState,
              center: pointInfo.point
            }
          });
        }}
        onDragend={endPoint => {
          this.setPositionInfo(endPoint, pointInfo.uid);
        }}
        onMouseout={() => {
          setTimeout(() => {
            this.updateMarkerItem(pointInfo.uid, {
              labelProps: { show: false }
            });
          }, 0);
        }}
        onMouseover={() => {
          setTimeout(() => {
            this.updateMarkerItem(pointInfo.uid, {
              labelProps: { show: true }
            });
          }, 0);
        }}
      >
        <MarkerIcon {...pointInfo.iconProps} />
        <Label {...pointInfo.labelProps}>{`<p class="global-maplabel-text-main">${pointInfo.title || 
""}</p><p class="global-maplabel-text-sub">${pointInfo.province || ""}${pointInfo.city || ""}</p>`}</Label>
        {this.state.hasSelect ? null : (
          <SimpleInfoWindow
            {...pointInfo.infoWindowProps}
            contentEvents={{
              "confirmButton.click": (evt, markerInstance, infoWindowInstance) => this.onClickMark(pointInfo, infoWindowInstance)
            }}
          >
            <Row className="global-maplabel-wrap">
              <Col span={24} className="global-maplabel-content">
                <p className="global-maplabel-text-main">{`${pointInfo.title || ""}`}</p>
                <p className="global-maplabel-text-sub">{pointInfo.address || ""}</p>
              </Col>
              <Col span={8} className="global-maplabel-ctrl">
                <Button type="ghost" className="confirmButton">
                  确定
                </Button>
              </Col>
            </Row>
          </SimpleInfoWindow>
        )}
      </Marker>
    );
  }
  startSearch = keywordStart => {
    this.setState({
      hasSelect: false
    });
    if (keywordStart) {
      let historyArray = this.state.historyArray;
      if (!historyArray.includes(keywordStart)) {
        historyArray.push(keywordStart);
      }
      this.setState({ historyArray, markerList: [] });
      this.localSearchDiv.search(keywordStart);
    }
  };
  onLocalSearchComplete = results => {
    var firstPoint = results && results.getPoi(0);
    console.log("onLocalSearchComplete results:", results, firstPoint);
    if (firstPoint) {
      this.setState({
        mapState: {
          ...this.state.mapState,
          viewport: this.formatSearchData(results).map(item => item.point)
        },
        markerList: this.formatSearchData(results).map((item, index) => {
          item.iconProps = {
            ...this.state.icon,
            size: new NDMap.Size(20, 28),
            index,
            imageOffset: new NDMap.Size(-20 * index, 0)
          };
          item.labelProps = { ...this.state.label, show: false };
          item.infoWindowProps = { show: false };
          item.markerProps = {
            ...this.state.markerState,
            point: item.point,
            offset: new NDMap.Size(0, -10)
          };
          return item;
        })
      });
    } else {
      alert("没找到");
    }
  };
  onClickMark = (pointInfo, infoWindowInstance) => {
    //react事件和百度地图InfoWindow事件冲突了，目前采用这种方式绑定事件
    this.updateMarkerItem(pointInfo.uid, {
      iconProps: {
        ...pointInfo.iconProps,
        size: new NDMap.Size(28, 40),
        imageOffset: new NDMap.Size(0, -68)
      }
    });
    this.setState({
      hasSelect: true,
      markerList: this.state.markerList.filter(item => item.uid === pointInfo.uid)
    });
    infoWindowInstance.close();
  };
  render() {
    return (
      <div className="tilemap-container-demo">
        <Row style={{ height: 50 }}>
          <Col span={6}>
            <Cascader
              size="large"
              options={this.state.areaData}
              onChange={this.onAreaChange}
              placeholder="请选择地区"
            />
          </Col>
          <Col span={13} offset={1}>
            <AutoComplete
              filterOption={false}
              allowClear
              className="global-search"
              dropdownClassName="global-search-search-dropdown"
              size="large"
              dataSource={this.state.dataSource}
              onChange={this.onChangeKeyword}
              onSelect={value => {
                this.startSearch(value);
              }}
              placeholder={`在 ${this.state.areaValue || "全国"} 搜索`}
              optionLabelProp="value"
            >
              <Input id="divSearch" />
            </AutoComplete>
          </Col>
          <Col span={3} offset={1}>
            <Button
              className="search-btn"
              size="large"
              type="primary"
              onClick={() => {
                this.startSearch(this.state.keyword);
              }}
            >
              搜索
            </Button>
          </Col>
        </Row>
        <Map
          setComponentInstance={mapNow => {
            this.mapNow = mapNow;
          }}
          className="tilemap-demo"
          {...this.state.mapState}
        >
          {this.state.markerList
            ? this.state.markerList.map((itemMarkerData, index) => {
                return this.getMarker(itemMarkerData);
              })
            : null}
          <CustomControl anchor={BMAP_ANCHOR_TOP_RIGHT}>
            <Search
              placeholder="全国搜索"
              id="mapSearch"
              style={{ width: 200 }}
              onSearch={this.onClickMapInputSearch}
            />
          </CustomControl>
          <AutocompleteMap input="mapSearch" onOnconfirm={this.onClickItem} />
          <LocalSearch keyword={this.state.keywordMap} onSearchComplete={this.onLocalSearchComplete} />
          <AutocompleteMap
            location={this.state.areaValueCity}
            keyword={this.state.keyword}
            onSearchComplete={results => {
              console.log("divSearch AutocompleteMap results:", results);
              if (results && results.keyword) {
                this.setState({
                  dataSource: this.getOptionsBySearchResults(results)
                });
              }
            }}
          />
          <LocalSearch
            setComponentInstance={localSearchDiv => {
              this.localSearchDiv = localSearchDiv;
            }}
            location={this.state.areaValueCity}
            onSearchComplete={this.onLocalSearchComplete}
          />
        </Map>
        <div id="error-ie8" />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.global-search-wrapper {
  padding-right: 50px;
}

.global-search {
  width: 100%;
}

/* ？ */
.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input:not(:last-child) {
  padding-right: 62px;
}
/* ？ */
.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 0;
}

.global-search-search-dropdown .ant-select-dropdown-menu-item {
  padding: 5px 12px 4px;
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.del-item {
  text-align: right;
  cursor: default;
  border-top: 1px solid #ddd;
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.del-item .ant-btn-font {
  font-size: 12px;
  color:#bbb;
  vertical-align:top;
  border:none;
  height:20px;
  line-height:20px;
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.empty-item {
  cursor: default;
  padding: 16px 20px;
}
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.custom-item {
  cursor: default;
}
.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix
  button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.global-search-empty-text {
  line-height:24px;
  font-size:12px;
  color:#666;
}
.global-search-empty-list li {
  position:relative;
  padding-left:8px;
  line-height:20px;
  font-size:12px;
  color:#666;
}
.global-search-empty-list li:before {
  position:absolute;
  left:0;
  top:50%;
  width:2px;
  height:2px;
  content:"";
  margin-top:-1px;
  background-color:#666;
}
.global-search-empty-strong {
  color:#3ba8f0;
}
.global-maplabel-wrap {
  position:relative;
  padding: 10px;
  padding-right: 54px;
}
.global-maplabel-ctrl {
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  width:54px;
  border-left:1px solid #ddd;
}
.global-maplabel-ctrl .confirmButton {
  width:100%;
  padding: 5px;
  border: none;
  font-size:12px;
  color: #3ba8f0;
  height: 100%;
  text-align:center;
}
.global-maplabel-ctrl .confirmButton:after {
  display: inline-block;
  vertical-align:middle;
  width: 0;
  height: 100%;
  content: "";
}
.global-maplabel-ctrl .confirmButton > span {
  display: inline-block;
  vertical-align:middle;
  margin: 0;
}
```

### 调起百度地图

Web 版百度地图面向 PC 浏览器的网站应用，调起的百度地图地址为：//map.baidu.com/ ；

```jsx
import {
  MapLinkMarker,
  MapLinkDirection,
  MapLinkGeocoder,
  MapLinkLine,
  MapLinkPano,
  MapLinkPlaceDetail,
  MapLinkPlaceSearch
} from "rc-tile-map";
import { Icon, Tabs, Row, Col } from "antd";
const TabPane = Tabs.TabPane;
class App extends React.Component {
  state = {
    marker: {
      location: "26.097159,119.319762",
      title: "851大楼",
      content: "福州市鼓楼区温泉支路58号"
    }
  };
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="链接模式" key="1">
          <div className="tilemap-demo">
            <Row className="line-demo">
              <MapLinkMarker
                className="maplink-demo"
                style={{ color: "red" }}
                {...this.state.marker}
              >
                <Icon type="link" />
                在指定坐标点上显示名称"851大楼"，内容"福州市鼓楼区温泉支路58号"的信息窗口
              </MapLinkMarker>
            </Row>
            <Row className="line-demo">
              <MapLinkDirection
                className="maplink-demo"
                origin="latlng:26.097159,119.319762|name:我的公司"
                destination="亚太中心"
                mode="driving"
                region="福州"
              >
                <Icon type="link" />
                展示"福州市"从（lat:26.097159，lng:119.319762 ）"我的公司"到"亚太中心"的驾车路线
              </MapLinkDirection>
            </Row>
            <Row className="line-demo">
              <MapLinkGeocoder
                className="maplink-demo"
                address="福州市鼓楼区851大楼"
              >
                <Icon type="link" />
                显示“福州市鼓楼区851大楼”对应的坐标点
              </MapLinkGeocoder>
            </Row>
            <Row className="line-demo">
              <MapLinkGeocoder
                className="maplink-demo"
                location="26.097159,119.319762"
              >
                <Icon type="link" />
                逆地理编码坐标（lat:26.097159，lng:119.319762）后，以标注形式显示位置和地址信息
              </MapLinkGeocoder>
            </Row>
            <Row className="line-demo">
              <MapLinkLine
                className="maplink-demo"
                region="福州"
                name="地铁1号线"
              >
                <Icon type="link" />
                展示"福州市"地铁1号线
              </MapLinkLine>
            </Row>
            <Row className="line-demo">
              <MapLinkPano
                className="maplink-demo"
                ak="zIT2dNIgEojIIYjD91wIbiespAnwM0Zu"
                x={119.319642}
                y={26.096715}
                z={1}
              >
                <Icon type="link" />
                展示坐标（lat:26.096715，lng:119.319642）对应的全景点
              </MapLinkPano>
            </Row>
            <Row className="line-demo">
              <MapLinkPlaceDetail
                className="maplink-demo"
                uid="6a78257f421f66d3af31e5ad"
              >
                <Icon type="link" />
                展示通过LocalSearch查询获取到的uid为"6a78257f421f66d3af31e5ad"对应的详情页面
              </MapLinkPlaceDetail>
            </Row>
            <Row className="line-demo">
              <MapLinkPlaceSearch
                className="maplink-demo"
                query="停车场"
                location="latlng:26.097159,119.319762|name:我的公司"
                radius={1000}
              >
                <Icon type="link" />
                检索坐标（lat:26.097159，lng:119.319762，name:我的公司）周边1000m的停车场
              </MapLinkPlaceSearch>
            </Row>
            <Row className="line-demo">
              <MapLinkPlaceSearch
                className="maplink-demo"
                query="亚太中心 停车场"
                region="福州"
              >
                <Icon type="link" />
                在“福州”检索“亚太中心 停车场”
              </MapLinkPlaceSearch>
            </Row>
          </div>
        </TabPane>
        <TabPane tab="iframe模式" key="2">
          <iframe
            src={new MapLinkMarker().getLinkUrl(this.state.marker)}
            className="tilemap-demo"
          />
        </TabPane>
      </Tabs>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.maplink-demo {
  border: solid 1px gray;
  padding: 5px;
}
.tilemap-demo .line-demo {
  height: 50px;
}
```



## API

密钥 ak 业务方使用时自己维护，[快速入门](https://lbsyun.baidu.com/index.php?title=jspopular/guide/helloworld)

```html
<!-- 直接调起百度地图不需要引入 -->
<script type="text/javascript" src="//api.map.baidu.com/api?v=3.0&s=1&ak=zIT2dNIgEojIIYjD91wIbiespAnwM0Zu"></script>
```

### NDMap

相当于 BMap，未定义或已有组件满足不了时使用。百度地图部分 API 失效，下面 API 不会列出。

### 共同的 API

以下 API 为 所有地图组件共享的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| on\* | on+百度地图事件名称 | function | - |
| setComponentInstance | 设置组件实例 | function | - |

### 地图 Map

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| center | 设置地图中心点，如果center类型为字符串，必须是城市名称 | [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0)\|string | 北京 |
| className | 地图平台容器节点样式类名称 | string | - |
| disableDoubleClickZoom | 是否禁用双击放大 | boolean | false |
| disableScrollWheelZoom | 是否禁用滚轮放大缩小 | boolean | false |
| enableAutoResize | 是否自动适应地图容器变化 | boolean | true |
| enableMapClick | 是否开启底图可点功能 | boolean | true |
| id | 地图平台容器节点 ID | string | - |
| mapType | 地图类型，默认为 | [MapType](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a5b0) | BMAP_NORMAL_MAP |
| maxZoom | 地图允许展示的最大级别 | number | - |
| minZoom | 地图允许展示的最小级别 | number | - |
| style | 地图平台容器节点样式 | Object | - |
| viewport | 设置地图视野，相当于 center+zoom，viewport 优先生效 | [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0)\[]\|[Viewport](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a0b3) | - |
| zoom | 设置地图的缩放等级 | number | 11 |

### 图层 TileLayer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| getTilesUrl | 抽象。向地图返回地图图块的网址，图块索引由 tileCoord 的 x 和 y 属性在指定的缩放级别 zoom 提供。如果您在 TileLayerOptions 中提供了 tileUrlTemplate 参数，则可不实现此接口 | function(tileCoord: Pixel, zoom: Number):string | - |
| tileUrlTemplate | 指定图块网址模板，该模板可以针对每个图块请求而展开，以根据现有的图块坐标系引用唯一的图块。模板的格式应该为：<https://yourhost/tile?x={X}&y={Y}&z={Z}.png> 其中 X 和 Y 分别指纬度和经度图块坐标，Z 指缩放级别，比如： <https://yourhost/tile?x=3&y=27&z=5.png> 如果您没有提供图块网址模板，您需要实现 TileLayer.getTileUrl()抽象方法 | string | - |
| zIndex | 图层的 zIndex | number | - |

### 标注 Marker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 设置 Marker 关联覆盖物，如 Label，InfoWindow | ReactNode | - |
| draggingCursor | 拖拽标注时的鼠标指针样式。此属性值需遵循 CSS 的 cursor 属性规范 | string | - |
| enableClicking | 是否响应点击事件 | boolean | true |
| enableDragging | 是否启用拖拽 | boolean | false |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物 | boolean | true |
| icon | 标注所用的图标对象 | [Icon](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b5) | [marker_red_sprite.png](https://api0.map.bdimg.com/images/marker_red_sprite.png) |
| offset | 标注的位置偏移值 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | - |
| point | 必填，指定了图像标注所在的地理位置 | [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) | - |
| raiseOnDrag | 拖拽标注时，标注是否开启离开地图表面效果 | boolean | false |
| rotation | 旋转角度 | number | - |
| shadow | 阴影图标 | [Icon](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b5) | [marker_red_sprite.png](https://api0.map.bdimg.com/images/marker_red_sprite.png) |
| show | 是否显示组件 | boolean | true |
| title | 鼠标移到 marker 上的显示内容 | string | - |

### 信息窗口 InfoWindow

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 设置信息窗口内容。支持 HTML 内容。 content 参数支持传入 DOM 结点 | string\|node | - |
| contentEvents | 内容事件绑定（格式是{key:function}，其中 key 为显示内容中 dom 元素的 className+事件名称，如：confirmButton.click） | {key:function(evt, markerInstance, infoWindowInstance)} |  |
| enableAutoPan | 是否开启信息窗口打开时地图自动移动 | boolean | true |
| enableCloseOnClick | 是否开启点击地图关闭信息窗口 | boolean | true |
| height | 信息窗高度，单位像素。取值范围：0, 60 - 650。如果您指定高度为 0，则信息窗口的高度将按照其内容自动调整 | number | 0 |
| maxWidth | 信息窗最大化时的宽度，单位像素。取值范围：220 - 730 | number | - |
| offset | 信息窗位置偏移值。默认情况下在地图上打开的信息窗底端的尖角将指向其地理坐标，在标注上打开的信息窗底端尖角的位置取决于标注所用图标的 infoWindowOffset 属性值，您可以为信息窗添加偏移量来改变默认位置 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | - |
| position | 指定信息窗口所在的地理位置，没有放到 Marker 的 children 时，必填 | [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) | - |
| show | 是否显示组件 | boolean | true |
| title | 信息窗标题文字，支持 HTML 内容 | string | - |
| width | 信息窗宽度，单位像素。取值范围：0, 220 - 730。如果您指定宽度为 0，则信息窗口的宽度将按照其内容自动调整 | number | 0 |

### 自定义信息窗口 InfoBox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 基于哪个位置进行定位，取值为[INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM] | [INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM] | INFOBOX_AT_TOP |
| boxClass | 定义 infoBox 的 class | string | 'infoBox' |
| boxStyle | 定义 infoBox 的 style,此项会覆盖 boxClass | object | {} |
| children | 设置信息窗口内容。支持 HTML 内容。 content 参数支持传入 DOM 结点 | string\|node | - |
| closeIconMargin | 关闭按钮的 margin | string | '2px' |
| closeIconUrl | 关闭按钮的 url 地址 | string | '//cdncs.101.com/v0.1/static/fish/image/close.png' |
| contentEvents | 内容事件绑定（格式是{key:function}，其中 key 为显示内容中 dom 元素的 className+事件名称，如：confirmButton.click） | {key:function(evt, markerInstance, infoWindowInstance)} | {} |
| enableAutoPan | 是否启动自动平移功能 | boolean | true |
| offset | 信息窗位置偏移值。默认情况下在地图上打开的信息窗底端的尖角将指向其地理坐标，在标注上打开的信息窗底端尖角的位置取决于标注所用图标的 infoWindowOffset 属性值，您可以为信息窗添加偏移量来改变默认位置 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(0, 15) |
| show | 是否显示组件 | boolean | true |

### 自定义信息窗口 SimpleInfoWindow

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 基于哪个位置进行定位，取值为[INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM] | [INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM] | INFOBOX_AT_TOP |
| boxClass | 定义 infoBox 的 class | string | 'ant-map-maplabel' |
| boxStyle | 定义 infoBox 的 style,此项会覆盖 boxClass | object | {} |
| children | 设置信息窗口内容。支持 HTML 内容。 content 参数支持传入 DOM 结点 | string\|node | - |
| closeIconMargin | 关闭按钮的 margin | string | '2px' |
| closeIconUrl | 关闭按钮的 url 地址 | string | '//cdncs.101.com/v0.1/static/fish/image/blank.gif' |
| contentEvents | 内容事件绑定（格式是{key:function}，其中 key 为显示内容中 dom 元素的 className+事件名称，如：confirmButton.click） | {key:function(evt, markerInstance, infoWindowInstance)} | {} |
| enableAutoPan | 是否启动自动平移功能 | boolean | true |
| offset | 信息窗位置偏移值。默认情况下在地图上打开的信息窗底端的尖角将指向其地理坐标，在标注上打开的信息窗底端尖角的位置取决于标注所用图标的 infoWindowOffset 属性值，您可以为信息窗添加偏移量来改变默认位置 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(0, 43) |
| show | 是否显示组件 | boolean | true |

### 折线 Polyline

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enableClicking | 是否响应点击事件 | boolean | true |
| enableEditing | 是否启用线编辑 | boolean | false |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物 | boolean | true |
| points | 设置折线的点数组，必填 | [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0)\[] | - |
| show | 是否显示组件 | boolean | true |
| strokeColor | 折线颜色 | string | 'blue' |
| strokeOpacity | 折线的透明度，取值范围 0 - 1 | number | 0.5 |
| strokeStyle | 折线的样式，solid 或 dashed | string | 'solid' |
| strokeWeight | 折线的宽度，以像素为单位 | number | 2 |

### 多边形 Polygon

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enableClicking | 是否响应点击事件 | boolean | true |
| enableEditing | 是否启用线编辑 | boolean | false |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物 | boolean | true |
| fillColor | 填充颜色。当参数为空时，折线覆盖物将没有填充效果 | string | 'white' |
| fillOpacity | 填充的透明度，取值范围 0 - 1 | number | 0.5 |
| points | 设置多边型的点数组，必填 | [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0)\[] | - |
| show | 是否显示组件 | boolean | true |
| strokeColor | 边线颜色 | string | 'blue' |
| strokeOpacity | 边线的透明度，取值范围 0 - 1 | number | 0.5 |
| strokeStyle | 边线的样式，solid 或 dashed | string | 'solid' |
| strokeWeight | 边线的宽度，以像素为单位 | number | 2 |

### 圆 Circle

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| center | 设置圆形的中心点坐标，必填 | [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) | - |
| enableClicking | 是否响应点击事件 | boolean | true |
| enableEditing | 是否启用线编辑 | boolean | false |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物 | boolean | true |
| fillColor | 圆形填充颜色。当参数为空时，折线覆盖物将没有填充效果 | string | 'white' |
| fillOpacity | 圆形填充的透明度，取值范围 0 - 1 | number | 0.5 |
| radius | 设置圆形的半径，单位为米，必填 | number | - |
| show | 是否显示组件 | boolean | true |
| strokeColor | 圆形边线颜色 | string | 'blue' |
| strokeOpacity | 圆形边线的透明度，取值范围 0 - 1 | number | 0.5 |
| strokeStyle | 圆形边线的样式，solid 或 dashed | string | 'solid' |
| strokeWeight | 圆形边线的宽度，以像素为单位 | number | 2 |

### 文本标注 Label

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 设置文本标注的内容。支持 HTML 字符串 | string | - |
| enableMassClear | 是否在调用 map.clearOverlays 清除此覆盖物 | boolean | true |
| offset | 文本标注的位置偏移值 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | - |
| position | 指定文本标注的地理位置，没有放到 Marker 的 children 时，必填 | [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) | - |
| show | 是否显示组件 | boolean | true |
| style | 设置文本标注样式，该样式将作用于文本标注的容器元素上。其中 styles 为 JavaScript 对象常量，比如： setStyle({ color : "red", fontSize : "12px" }) 注意：如果 css 的属性名中包含连字符，需要将连字符去掉并将其后的字母进行大写处理，例如：背景色属性要写成：backgroundColor | Object | - |
| title | 设置文本标注的标题，当鼠标移至标注上时显示此标题 | string | - |
| zIndex | 设置覆盖物的 zIndex | number | - |

### 标注图标 MarkerIcon

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 信息窗口定位锚点。开启信息窗口时，信息窗口底部尖角相对于图标左上角的位置，默认等于图标的 anchor | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | - |
| imageOffset | 图片相对于可视区域的偏移值 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | - |
| imageSize | 图标所用的图片的大小，此功能的作用等同于 CSS 中的 background-size 属性。可用于实现高清屏的高清效果 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | - |
| imageUrl | 设置图片资源的地址 | string | - |
| infoWindowAnchor | 信息窗口定位锚点。开启信息窗口时，信息窗口底部尖角相对于图标左上角的位置，默认等于图标的 anchor | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | - |
| show | 是否显示组件 | boolean | true |
| size | 图标可视区域的大小 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | - |

### 控件基类 MapControl

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 设置控件停靠的位置 | [ControlAnchor](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | - |
| offset | 设置控件停靠的偏移量 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | - |
| show | 是否显示控件 | boolean | true |

### 比例尺控件 ScaleControl

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 设置控件停靠的位置 | [ControlAnchor](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_LEFT |
| offset | 设置控件停靠的偏移量 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(112, 26) |
| show | 是否显示控件 | boolean | true |

### 缩放平移控件 NavigationControl

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 设置控件停靠的位置 | [ControlAnchor](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_TOP_LEFT |
| enableGeolocation | 控件是否集成定位功能 | boolean | false |
| offset | 设置控件停靠的偏移量 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(10, 10) |
| show | 是否显示控件 | boolean | true |
| showZoomInfo | 是否显示级别提示信息 | boolean | true |
| type | 设置控件停靠的位置 | [NavigationControlType](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b4) | BMAP_NAVIGATION_CONTROL_LARGE |

### 版权信息控件 CopyrightControl

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 设置控件停靠的位置 | [ControlAnchor](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_RIGHT |
| copyright | 添加版权信息 | [Copyright](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b14) | - |
| offset | 设置控件停靠的偏移量 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(5, 2) |
| show | 是否显示控件 | boolean | true |

### 地图定位控件 GeolocationControl

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 设置控件停靠的位置 | [ControlAnchor](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_LEFT |
| enableAutoLocation | 添加控件时是否进行定位 | boolean | false |
| locationIcon | 自定义定位中心点的 Icon 样式 | [Icon](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b5) | [success-40x40.png](https://api0.map.bdimg.com/images/geolocation-control/mobile/success-40x40.png) |
| offset | 设置控件停靠的偏移量 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(0, 50) |
| show | 是否显示控件 | boolean | true |
| showAddressBar | 是否显示定位信息面板 | boolean | true |

### 切换地图类型控件 MapTypeControl

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 设置控件停靠的位置 | [ControlAnchor](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_TOP_LEFT |
| mapTypes | 控件展示的地图类型，默认为普通图、卫星图、卫星加路网混合图和三维图。通过此属性可配置控件展示的地图类型 | [MapType](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b4)\[] | 全部类型 |
| offset | 设置控件停靠的偏移量 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(10, 10) |
| show | 是否显示控件 | boolean | true |
| type | 控件样式 | [MapTypeControlType](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b17) | BMAP_MAPTYPE_CONTROL_HORIZONTAL |

### 缩略地图控件 OverviewMapControl

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 设置控件停靠的位置 | [ControlAnchor](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_RIGHT |
| isOpen | 缩略地图添加到地图后的开合状态 | boolean | false |
| offset | 设置控件停靠的偏移量 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(0, 0) |
| show | 是否显示控件 | boolean | true |
| size | 设置缩略地图的大小 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(150, 150) |

### 切换至全景地图控件 PanoramaControl

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 设置控件停靠的位置 | [ControlAnchor](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_BOTTOM_RIGHT |
| offset | 设置控件停靠的偏移量 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(0, 0) |
| show | 是否显示控件 | boolean | true |

### 自定义控件 CustomControl

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| anchor | 设置控件停靠的位置 | [ControlAnchor](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a2b1) | BMAP_ANCHOR_TOP_LEFT |
| children | 设置自定义控件内容。支持传入 DOM 结点 | string\|node | - |
| offset | 设置控件停靠的偏移量 | [Size](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b3) | new BMap.Size(10, 10) |
| show | 是否显示控件 | boolean | true |

### 位置检索 LocalSearch

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| keyword | 检索词变化时发起检索。当 keyword 为数组时将同时执行多关键字的查询，最多支持 10 个关键字。 | string\|string\[] | - |
| location | 表示检索区域，其类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定，且搜索结果的标注将自动加载到地图上，并支持调整地图视野层级；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会优先在该城市内进行 | Map \| [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) \| string | Map 实例 |
| pageCapacity | 结果列表添加完成后的回调函数。 参数： container: HTMLElement，结果列表所用的 HTML 元素 | number | - |
| renderOptions | 结果呈现设置 | [RenderOptions](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a7b3) | - |
| searchOption | forceLocal 表示是否将搜索范围约束在当前城市，customData 表示检索 lbs 云服务的数据 | {forceLocal:Boolean, customData:CustomData} | - |
| onInfoHtmlSet | 标注气泡内容创建后的回调函数。 参数： poi: LocalResultPoi，通过其 marker 属性可得到当前的标注。 html: HTMLElement，气泡内的 Dom 元素 | function | - |
| onMarkersSet | 标注添加完成后的回调函数。 参数： pois: Array，通过 marker 属性可得到其对应的标注 | function | - |
| onResultsHtmlSet | 结果列表添加完成后的回调函数。 参数： container: HTMLElement，结果列表所用的 HTML 元素 | function | - |
| onSearchComplete | 检索完成后的回调函数。 参数：results: LocalResult 或 Array 如果是多关键字检索，回调函数参数返回一个 LocalResult 的数组，数组中的结果顺序和检索中多关键字数组中顺序一致 | function | - |

### 结果提示及自动完成类 Autocomplete

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| input | 文本输入框元素或其 id | string \| HTMLElement | - |
| location | 表示检索区域，其类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定，且搜索结果的标注将自动加载到地图上，并支持调整地图视野层级；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会优先在该城市内进行 | Map \| [Point](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a1b0) \| string | Map 实例 |
| types | 返回数据类型。两种设置方式，第一种为默认值（即设置值为空），将返回所有数据。如地图初始化为北京，在输入框中输入“小”，输入框下会出现包含“小”关键字的多种类型（如餐饮、地名等）的提示词条。第二种设置值为"city"，将返回省市区县乡镇街道地址类型数据。如地图初始化为北京，在输入框中输入“小”，输入框下会出现“小金县”的地点名称类的提示词条 | string\[] | - |
| onSearchComplete | 检索完成后的回调函数。 参数：results: LocalResult 或 Array 如果是多关键字检索，回调函数参数返回一个 LocalResult 的数组，数组中的结果顺序和检索中多关键字数组中顺序一致 | function | - |

### 调起百度地图基类 BaseMapLink

下列所有 mapLink 组件都有这些参数。src 固定为“网龙网络控股有限公司”，output 固定为“html”。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 内容，必填 | stirng\|node | - |
| className | 链接节点样式类名称 | string | - |
| coord_type | 坐标类型，可选参数。默认为 bd09 经纬度坐标。允许的值为 bd09ll、bd09mc、gcj02、wgs84。bd09ll 表示百度经纬度坐标，bd09mc 表示百度墨卡托坐标，gcj02 表示经过国测局加密的坐标，wgs84 表示 gps 获取的坐标。MapLinkPano 无此参数 | string | - |
| style | 链接节点样式 | Object | - |
| target | [特殊的文档重定向操作](https://www.w3school.com.cn/tags/att_a_target.asp)，可选值：\_blank,\_self,\_parent,\_top | string | '\_blank' |
| zoom | 展现地图的级别，默认为视觉最优级别。MapLinkPano 无此参数 | number | - |

### 地图标点功能 MapLinkMarker

调用该接口可调起 PC 或 web 地图，且在指定坐标点上显示点的名称和内容信息。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 标注点显示内容 ，必填 | string | - |
| location | 标注点经纬度，参数格式：lat&lt;纬度>,lng&lt;经度>，必填 | stirng | - |
| title | 标注点显示标题，必填 | string | - |

### 地址解析和反向地址解析（地址查询） MapLinkGeocoder

- 地址解析：调用该接口可以在调起百度地图时，当前页面显示地址对应的坐标点。
- 反向地址解析（地址查询）：调用该接口可调起 PC 或 Web 百度地图，经过逆地理编码后，以标注形式显示位置和地址信息。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| address | 地址名称，location 为空时必填 | string | - |
| location | 标注点经纬度，参数格式：lat&lt;纬度>,lng&lt;经度>，address 为空时必填 | stirng | - |

### POI（地点）搜索 MapLinkPlaceSearch

调用该接口可调起 PC 或 Web 百度地图，通过本地检索服务，以列表形式显示符合查询条件的点。

选择方式：地点搜索限定范围可以由 region、bounds 和 location + radius 方式进行，其中 bounds 优先级最高、region 优先级最低（与 web 服务保持一致）

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bounds | 视野范围。参数格式：lat,lng&lt;左下角>,lat,lng&lt;右上角> | string | - |
| location | 中心点经纬度。参数格式：lat&lt;纬度>,lng&lt;经度> | stirng | - |
| query | 关键词，必填 | stirng | - |
| radius | 检索半径 | number | - |
| region | 城市名或县名 | stirng | - |

### POI 详情页展示 MapLinkPlaceDetail

调用该接口可调起 PC 或 Web 百度地图，通过 POI 详情查询服务，显示指定点的详情信息。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| uid | POI 的 ID，必填 | stirng | - |

### 公交、地铁线路查询 MapLinkLine

调用该接口可调起 PC 或 Web 百度地图，通过线路查询服务，以列表形式显示线路信息。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 线路名称，必填 | stirng | - |
| region | 城市名或县名，必填 | stirng | - |

### 公交、驾车、步行路线规划 MapLinkDirection

调用该接口可调起 PC 或 Web 百度地图，通过线路查询服务，以列表形式显示公交、驾车、步行路线规划。

origin 三种格式：

1、名称：天安门

2、经纬度：39.98871&lt;纬度>,116.43234&lt;经度>。

3、名称和经纬度：name:天安门|latlng:39.98871,116.43234

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| destination | 终点名称或经纬度，或者可同时提供名称和经纬度，此时经纬度优先级高，将作为导航依据，名称只负责展示。必填 | stirng | - |
| destination_region | 终点所在城市或县。和 dorigin_region 一起使用。 | stirng | - |
| mode | 导航模式，固定为 transit、driving、walking，分别表示公交、驾车和步行。必填 | stirng | - |
| origin | 起点名称或经纬度，或者可同时提供名称和经纬度，此时经纬度优先级高，将作为导航依据，名称只负责展示。必填 | stirng | - |
| origin_region | 起点所在城市或县。和 destination_region 一起使用。 | stirng | - |
| region | 城市名或县名。当给定 region 时，认为起点和终点都在同一城市，除非单独给定起点 origin_region 或终点的城市 destination_region。 | stirng | - |

### 全景服务 MapLinkPano

调用该接口可以在调起百度地图 api 时，当前页面显示对应的全景点。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ac | 是否显示相册控件。1 开启，0 关闭 | number | 1 |
| ak | 应用秘钥，必填 | stirng | - |
| h | 水平角度 | number | 默认为该场景点最佳角度 |
| iec | 是否显示内部全景出口。1 开启，0 关闭 | number | 1 |
| issc | 是否显示内景场景切换控件。1 开启，0 关闭 | number | 1 |
| lc | 是否显示拓扑箭头。1 开启，0 关闭 | number | 1 |
| nc | 是否显示鱼骨控件。1 开启，0 关闭 | number | 1 |
| p | 垂直视角 | number | 默认为该场景点最佳角度 |
| pid | 显示该 id 的全景点。xy/pid/uid 三组参数必选一组 | stirng | - |
| uid | 显示该 poi 的全景点。xy/pid/uid 三组参数必选一组 | stirng | - |
| x | 经度，和 y 一起使用，显示该经纬周围最近的全景点。xy/pid/uid 三组参数必选一组 | number | - |
| y | 维度，和 x 一起使用，显示该经纬周围最近的全景点。xy/pid/uid 三组参数必选一组 | number | - |
| z | 场景缩放级别 | number | 3 |
