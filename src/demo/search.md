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
  Marker,
  InfoWindow,
  Label
} from "@sdp.nd/nd-tile-map";
import { Input, Button, Icon, Row, Col } from "fish";
const Search = Input.Search;
const geoc = new NDMap.Geocoder();

class App extends React.Component {
  mapNow;
  state = {
    keyword: null,
    mapState: {
      zoom: 15
    },
    markerState: {
      point: null,
      enableDragging: true
    },
    label: {
      show: false,

      offset: new NDMap.Size(20, -10)
    },
    pointInfo: {
      title: "",
      region: "",
      address: ""
    }
  };
  getTitle = (resultLoaction, firstPoint) => {
    let title = firstPoint.title;
    if (
      !title &&
      resultLoaction &&
      resultLoaction.surroundingPois &&
      resultLoaction.surroundingPois.length > 0
    ) {
      title = resultLoaction.surroundingPois[0].title;
    }
    return title || "";
  };
  setPositionInfo = firstPoint => {
    console.log("firstPoint:", firstPoint);
    geoc.getLocation(firstPoint.point, resultLoaction => {
      console.log("resultLoaction:", resultLoaction);
      const positionInfo = resultLoaction.addressComponents;
      this.setState({
        pointInfo: {
          region: `${positionInfo.province} ${positionInfo.city} ${
            positionInfo.district
          }`,
          address: `${positionInfo.street}${
            positionInfo.streetNumber
          }${this.getTitle(resultLoaction, firstPoint)}`,
          title: `${this.getTitle(resultLoaction, firstPoint)} ${
            positionInfo.city
          } ${positionInfo.district}`
        }
      });
    });
  };
  onClickItem = ({ type, target, item }) => {
    console.log("type:", type, "target:", target, "item:", item);
    // this.mapNow.clearOverlays();
    var positionInfo = item.value;
    this.setState({
      keyword:
        positionInfo.province +
        positionInfo.city +
        positionInfo.district +
        positionInfo.street +
        positionInfo.business
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
            <Marker
              {...this.state.markerState}
              onDragend={endPoint => {
                if (!endPoint.point.equals(this.state.markerState.point)) {
                  this.setPositionInfo(endPoint);
                }
              }}
              onMouseout={() => {
                this.setState({ label: { ...this.state.label, show: false } });
              }}
              onMouseover={() => {
                this.setState({ label: { ...this.state.label, show: true } });
              }}
            >
              <Label {...this.state.label}>{this.state.pointInfo.title}</Label>
              <InfoWindow>
                <Row>
                  <Col span={16}>
                    <p>{this.state.pointInfo.region}</p>
                    <p>{this.state.pointInfo.address}</p>
                  </Col>
                  <Col span={8}>
                    <Button type="font" icon="check">
                      确认地址
                    </Button>
                  </Col>
                </Row>
              </InfoWindow>
            </Marker>
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
              var firstPoint = results && results.getPoi(0); //获取第一个智能搜索的结果
              if (firstPoint) {
                this.setState({
                  mapState: {
                    ...this.state.mapState,
                    zoom: 18,
                    center: firstPoint.point
                  },
                  markerState: {
                    ...this.state.markerState,
                    point: firstPoint.point
                  }
                });
                this.setPositionInfo(firstPoint);
              } else {
                alert("没找到");
              }
            }}
          />
        </Map>
        <div id="error-ie8" />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
