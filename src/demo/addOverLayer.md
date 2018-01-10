---
order: 2
title: 添加覆盖物
---

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
      imageUrl: "http://api0.map.bdimg.com/images/marker_red_sprite.png",
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
              new NDMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", {
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
                        <img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house3.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="http://map.baidu.com">
                          中海雅园南北通透四居室
                        </a>
                        <p>4室2厅，205.00平米，3层</p>
                      </div>
                      <div className="rmb">760万</div>
                    </li>
                    <li>
                      <div className="left">
                        <img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house1.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="http://map.baidu.com">
                          中海雅园四居室还带保姆间
                        </a>
                        <p>2室1厅，112.00平米，16层</p>
                      </div>
                      <div className="rmb">300万</div>
                    </li>
                    <li>
                      <div className="left">
                        <img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house2.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="http://map.baidu.com">
                          《有钥匙 随时看》花园水系
                        </a>
                        <p>3室2厅，241.00平米，16层</p>
                      </div>
                      <div className="rmb">400万</div>
                    </li>
                    <li>
                      <div className="left">
                        <img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house3.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="http://map.baidu.com">
                          富力城D区正规楼王大三居
                        </a>
                        <p>3室3厅，241.00平米，17层</p>
                      </div>
                      <div className="rmb">600万</div>
                    </li>
                    <li className="last">
                      <div className="left">
                        <img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house1.jpg" />
                      </div>
                      <div className="left">
                        <a target="_blank" href="http://map.baidu.com">
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
                imageUrl: "http://lbsyun.baidu.com/jsdemo/img/fox.gif",
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
  background: url(http://api.map.baidu.com/library/InfoBox/1.2/examples/title.jpg)
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