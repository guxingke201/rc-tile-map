---
order: 2
title: 添加覆盖物
---

添加覆盖物：标注（Marker）,信息窗口（InfoWindow）,折线（Polyline），多边形（Polygon），圆（Circle），文本标注（Label），图标（Icon）

```jsx
import {
  Map,
  NDMap,
  Marker,
  InfoWindow,
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
      enableEditing: true,
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
        height: "20px",
        lineHeight: "20px",
        fontFamily: "微软雅黑"
      },
      offset: new NDMap.Size(20, -10)
    },
    markerIcon: {
      imageUrl: "http://api0.map.bdimg.com/images/marker_red_sprite.png",
      size: new NDMap.Size(19, 25)
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
              <div>
                <img
                  id="imgDemo"
                  src="//lbsyun.baidu.com/jsdemo/img/tianAnMen.jpg"
                  width="139"
                  height="104"
                  title="天安门"
                />
                <p>
                  天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...
                </p>
              </div>
            </InfoWindow>
            <Label title="覆盖物label" {...this.state.label}>
              我是文字标注哦~
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
          </Marker>
        </Map>
        <button
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
          onClick={() =>
            this.setState({
              common: { ...this.state.common, strokeColor: "blue" }
            })
          }
        >
          更新颜色
        </button>
        <button
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
.tilemap-demo {
  width: 100%;
  height: 500px;
}
.tilemap-container-demo button {
  margin: 5px;
}
```
