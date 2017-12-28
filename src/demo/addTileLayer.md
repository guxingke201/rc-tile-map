---
order: 1
title: 叠加图层
---

叠加图层

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
    return `http://lbsyun.baidu.com/jsdemo/demo/tiles/${zoom}/tile${x}_${y}.png`; //根据当前坐标，选取合适的瓦片图
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
            tileUrlTemplate="http://lbsyun.baidu.com/jsdemo/demo/tiles/{Z}/tile{X}_{Y}.png"
          />
          {this.state.showTileLayer ? (
            <TileLayer
              zIndex={4}
              tileUrlTemplate="http://lbsyun.baidu.com/jsdemo/img/border.png"
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
