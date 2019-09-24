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

## 文档 & 示例

http://localhost:8003
