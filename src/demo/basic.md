---
order: 0
title: 初始化地图
---

地图初始化基础操作

```jsx
import { Map, NDMap } from "@sdp.nd/nd-tile-map";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: new NDMap.Point(116.332782, 40.007978),
      zoom: 16,
      minZoom: 13,
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
          {...this.state}
          onClick={this.onClickMap}
          className="tilemap-demo"
          style={{ height: 501 }}
        />
        <button
          className="button-demo"
          onClick={() =>
            this.setState({ center: new BMap.Point(116.404, 39.915) })
          }
        >
          更新地图中心
        </button>
        <button
          className="button-demo"
          onClick={() => this.setState({ zoom: 15 })}
        >
          更新缩放级别
        </button>
        <button
          className="button-demo"
          onClick={() =>
            this.setState({
              viewport: {
                center: new NDMap.Point(116.332782, 40.007978),
                zoom: 16
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
