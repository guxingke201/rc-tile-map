---
order: 2
title: 添加覆盖物
---

添加覆盖物：点（Marker）,信息窗口（InfoWindow）

```jsx
import { Map, NDMap, Marker, InfoWindow } from "@sdp.nd/nd-tile-map";
class App extends React.Component {
  render() {
    return (
      <Map className="tilemap-demo">
        <Marker
          enableMassClear
          enableDragging
          enableClicking
          raiseOnDrag
          draggingCursor="move"
          rotation={-30}
          title="marker demo"
          position={new NDMap.Point(116.404, 39.915)}
        >
          <InfoWindow>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </InfoWindow>
        </Marker>
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
