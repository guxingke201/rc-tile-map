---
order: 1
title: 叠加层
---

叠加层

```jsx
import { Map, NDMap, TileLayer } from "@sdp.nd/nd-tile-map";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: new NDMap.Point(116.332782, 40.007978),
      zoom: 16
    };
    // this.state = {
    //   center: new NDMap.Point(0, 0),
    //   zoom: 3
    // };
  }
  getTilesUrl = (tileCoord, zoom) => {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return (
      "http://lbsyun.baidu.com/jsdemo/demo/tiles/" +
      zoom +
      "/tile" +
      x +
      "_" +
      y +
      ".png"
    ); //根据当前坐标，选取合适的瓦片图
  };
  render() {
    return (
      <Map
        center={this.state.center}
        zoom={this.state.zoom}
        disableDoubleClickZoom
        disableScrollWheelZoom
        className="tilemap-demo"
      >
        <TileLayer zIndex={3} getTilesUrl={this.getTilesUrl} />
        <TileLayer zIndex={4} tileUrlTemplate="http://lbsyun.baidu.com/jsdemo/img/border.png" />
        <TileLayer zIndex={1} tileUrlTemplate="http://lbsyun.baidu.com/jsdemo/demo/tiles/{Z}/tile{X}_{Y}.png" />
      </Map>
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
```
