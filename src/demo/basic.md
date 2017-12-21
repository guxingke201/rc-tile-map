---
order: 0
title: 初始化地图
---

初始化地图

```jsx
import { Map, NDMap } from "@sdp.nd/nd-tile-map";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: new NDMap.Point(116.332782, 40.007978),
      zoom: 16
    };
  }
  render() {
    return (
      <Map
        center={this.state.center}
        zoom={this.state.zoom}
        className="tilemap-demo"
      />
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
