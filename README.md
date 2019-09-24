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
import { Map, NDMap } from "@sdp.nd/nd-tile-map";
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
import { Map, NDMap, TileLayer } from "@sdp.nd/nd-tile-map";
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
} from "@sdp.nd/nd-tile-map";
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
} from "@sdp.nd/nd-tile-map";
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
} from "@sdp.nd/nd-tile-map";
import { Input, Button, Icon, Row, Col, Cascader, AutoComplete } from "fish";
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
              "confirmButton.click": (evt, markerInstance, infoWindowInstance) => {
                this.onClickMark(pointInfo, infoWindowInstance);
              }
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
} from "@sdp.nd/nd-tile-map";
import { Icon, Tabs, Row, Col } from "fish";
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
