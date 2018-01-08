---
order: 5
title: 调起百度地图
---

Web 版百度地图面向 PC 浏览器的网站应用，调起的百度地图地址为：http://map.baidu.com/ ；

```jsx
import {
  MapLinkMarker,
  MapLinkDirection,
  MapLinkGeocoder,
  MapLinkLine,
  MapLinkPano,
  MapLinkPlaceDetail,
  MapLinkPlaceSearch
} from "@sdp.nd/nd-tile-map";
import { Icon, Tabs, Row, Col } from "fish";
const TabPane = Tabs.TabPane;
class App extends React.Component {
  state = {
    marker: {
      location: "26.097159,119.319762",
      title: "851大楼",
      content: "福州市鼓楼区温泉支路58号"
    }
  };
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="链接模式" key="1">
          <div className="tilemap-demo">
            <Row className="line-demo">
              <MapLinkMarker
                className="maplink-demo"
                style={{ color: "red" }}
                {...this.state.marker}
              >
                <Icon type="link" />
                在指定坐标点上显示名称"851大楼"，内容"福州市鼓楼区温泉支路58号"的信息窗口
              </MapLinkMarker>
            </Row>
            <Row className="line-demo">
              <MapLinkDirection
                className="maplink-demo"
                origin="latlng:26.097159,119.319762|name:我的公司"
                destination="亚太中心"
                mode="driving"
                region="福州"
              >
                <Icon type="link" />
                展示"福州市"从（lat:26.097159，lng:119.319762 ）"我的公司"到"亚太中心"的驾车路线
              </MapLinkDirection>
            </Row>
            <Row className="line-demo">
              <MapLinkGeocoder
                className="maplink-demo"
                address="福州市鼓楼区851大楼"
              >
                <Icon type="link" />
                显示“福州市鼓楼区851大楼”对应的坐标点
              </MapLinkGeocoder>
            </Row>
            <Row className="line-demo">
              <MapLinkGeocoder
                className="maplink-demo"
                location="26.097159,119.319762"
              >
                <Icon type="link" />
                逆地理编码坐标（lat:26.097159，lng:119.319762）后，以标注形式显示位置和地址信息
              </MapLinkGeocoder>
            </Row>
            <Row className="line-demo">
              <MapLinkLine
                className="maplink-demo"
                region="福州"
                name="地铁1号线"
              >
                <Icon type="link" />
                展示"福州市"地铁1号线
              </MapLinkLine>
            </Row>
            <Row className="line-demo">
              <MapLinkPano
                className="maplink-demo"
                ak="zIT2dNIgEojIIYjD91wIbiespAnwM0Zu"
                x={119.319642}
                y={26.096715}
                z={1}
              >
                <Icon type="link" />
                展示坐标（lat:26.096715，lng:119.319642）对应的全景点
              </MapLinkPano>
            </Row>
            <Row className="line-demo">
              <MapLinkPlaceDetail
                className="maplink-demo"
                uid="6a78257f421f66d3af31e5ad"
              >
                <Icon type="link" />
                展示通过LocalSearch查询获取到的uid为"6a78257f421f66d3af31e5ad"对应的详情页面
              </MapLinkPlaceDetail>
            </Row>
            <Row className="line-demo">
              <MapLinkPlaceSearch
                className="maplink-demo"
                query="停车场"
                location="latlng:26.097159,119.319762|name:我的公司"
                radius={1000}
              >
                <Icon type="link" />
                检索坐标（lat:26.097159，lng:119.319762，name:我的公司）周边1000m的停车场
              </MapLinkPlaceSearch>
            </Row>
            <Row className="line-demo">
              <MapLinkPlaceSearch
                className="maplink-demo"
                query="亚太中心 停车场"
                region="福州"
              >
                <Icon type="link" />
                在“福州”检索“亚太中心 停车场”
              </MapLinkPlaceSearch>
            </Row>
          </div>
        </TabPane>
        <TabPane tab="iframe模式" key="2">
          <iframe
            src={new MapLinkMarker().getLinkUrl(this.state.marker)}
            className="tilemap-demo"
          />
        </TabPane>
      </Tabs>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.maplink-demo {
  border: solid 1px gray;
  padding: 5px;
}
.tilemap-demo .line-demo {
  height: 50px;
}
```
