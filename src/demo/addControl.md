---
order: 3
title: 添加控件
---

添加地图控件：比例尺控件（ScaleControl）,缩放平移控件（NavigationControl）,版权信息控件（CopyrightControl），地图定位控件（GeolocationControl）,切换地图类型控件（MapTypeControl）,缩略地图控件（OverviewMapControl），切换至全景地图控件（PanoramaControl）,自定义控件（CustomControl）。

```jsx
import {
  Map,
  NDMap,
  ScaleControl,
  NavigationControl,
  CopyrightControl,
  GeolocationControl,
  MapTypeControl,
  OverviewMapControl,
  PanoramaControl,
  CustomControl
} from "@sdp.nd/nd-tile-map";
class App extends React.Component {
  mapNow;
  state = {
    common: {
      show: true
    }
  };
  onLocationSuccess = ({ point, addressComponent }) => {
    console.log("point:", point, "addressComponent:", addressComponent);
    // 定位成功事件
    var address = "";
    address += addressComponent.province;
    address += addressComponent.city;
    address += addressComponent.district;
    address += addressComponent.street;
    address += addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
  };
  render() {
    return (
      <div className="tilemap-container-demo">
        <Map
          setComponentInstance={mapNow => {
            this.mapNow = mapNow;
          }}
          className="tilemap-demo"
          zoom={15}
          onClick={this.onClickMap}
        >
          <ScaleControl
            {...this.state.common}
            offset={new NDMap.Size(112, 26)}
            anchor={BMAP_ANCHOR_BOTTOM_LEFT}
          />
          <NavigationControl {...this.state.common} enableGeolocation />
          <NavigationControl
            {...this.state.common}
            anchor={BMAP_ANCHOR_TOP_RIGHT}
            type={BMAP_NAVIGATION_CONTROL_SMALL}
          />
          <CopyrightControl
            {...this.state.common}
            anchor={BMAP_ANCHOR_BOTTOM_RIGHT}
            copyright={{
              id: 1,
              content:
                "<span style='background-color:white;'>版权说明：清华校园图片取自互联网</span>"
            }}
          />
          <GeolocationControl
            {...this.state.common}
            onLocationSuccess={this.onLocationSuccess}
          />
          <MapTypeControl
            {...this.state.common}
            offset={new NDMap.Size(100, 10)}
            type={BMAP_MAPTYPE_CONTROL_MAP}
          />
          <OverviewMapControl
            {...this.state.common}
            offset={new NDMap.Size(10, 20)}
          />
          <PanoramaControl
            {...this.state.common}
            offset={new NDMap.Size(0, 200)}
          />
          <CustomControl
            {...this.state.common}
            offset={new NDMap.Size(360, 10)}
          >
            <div
              onClick={() => {
                this.mapNow.setZoom(this.mapNow.getZoom() + 2);
              }}
            >
              放大两级
            </div>
          </CustomControl>
          <CustomControl
            {...this.state.common}
            offset={new NDMap.Size(450, 10)}
          >
            <div
              onClick={() => {
                this.mapNow.setZoom(this.mapNow.getZoom() - 2);
              }}
            >
              缩小两级
            </div>
          </CustomControl>
        </Map>
        <button
          className="button-demo"
          onClick={() =>
            this.setState({
              common: {
                ...this.state.common,
                show: !this.state.common.show
              }
            })
          }
        >
          显示隐藏
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
