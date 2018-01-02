---
order: 4
title: 检索相关
---

用于位置检索、周边检索和范围检索

```jsx
import {
  Map,
  NDMap,
  CustomControl,
  Autocomplete,
  LocalSearch,
  Marker
} from "@sdp.nd/nd-tile-map";
import { Input, Button, Icon } from "fish";
const Search = Input.Search;
class App extends React.Component {
  mapNow;
  state = {
    keyword: null,
    mapState: {
      zoom: 15
    },
    markerState: {
      point: null
    }
  };
  onClickItem = ({ type, target, item }) => {
    console.log("type:", type, "target:", target, "item:", item);
    var _value = item.value;
    // this.mapNow.clearOverlays();
    this.setState({
      keyword:
        _value.province +
        _value.city +
        _value.district +
        _value.street +
        _value.business
    });
  };
  onClickInputSearch = keyword => {
    this.setState({
      keyword
    });
  };
  render() {
    return (
      <div className="tilemap-container-demo">
        <Search
          id="divSearch"
          style={{ width: 200 }}
          onSearch={this.onClickInputSearch}
        />
        <Map
          setComponentInstance={mapNow => {
            this.mapNow = mapNow;
          }}
          className="tilemap-demo"
          {...this.state.mapState}
        >
          {this.state.markerState.point ? (
            <Marker {...this.state.markerState} />
          ) : null}
          <Autocomplete input="mapSearch" onOnconfirm={this.onClickItem} />
          <Autocomplete input="divSearch" onOnconfirm={this.onClickItem} />
          <CustomControl anchor={BMAP_ANCHOR_TOP_RIGHT}>
            <Search
              id="mapSearch"
              style={{ width: 200 }}
              onSearch={this.onClickInputSearch}
            />
          </CustomControl>
          <LocalSearch
            keyword={this.state.keyword}
            onSearchComplete={results => {
              console.log("LocalSearch results:", results);
              var pp = results && results.getPoi(0); //获取第一个智能搜索的结果
              if (pp) {
                this.setState({
                  mapState: {
                    ...this.state.mapState,
                    zoom: 18,
                    center: pp.point
                  },
                  markerState: { ...this.state.markerState, point: pp.point }
                });
              } else {
                alert("没找到");
              }
            }}
          />
        </Map>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
