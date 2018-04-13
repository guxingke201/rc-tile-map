---
order: 4
title: 检索相关
---

位置检索（LocalSearch）、结果提示及自动完成类（Autocomplete）

```jsx
import {
  Map,
  NDMap,
  CustomControl,
  AutocompleteMap,
  LocalSearch,
  Marker,
  MarkerIcon,
  SimpleInfoWindow,
  Label
} from "@sdp.nd/nd-tile-map";
import { Input, Button, Icon, Row, Col, Cascader, AutoComplete } from "fish";
const Option = AutoComplete.Option;
const Search = Input.Search;
const geoc = new NDMap.Geocoder();
let timer = null;
class App extends React.Component {
  mapNow;
  localSearchDiv;
  lastClickMarker;
  state = {
    hasSelect: false,
    keywordMap: null,
    keyword: null,
    mapState: {
      zoom: 15
    },
    markerState: {
      enableDragging: true
    },
    markerList: [],
    icon: {
      imageUrl: "//cdncs.101.com/v0.1/static/fish/image/markers_num.png"
    },
    label: {
      offset: new NDMap.Size(30, -15)
    },
    pointInfo: {
      point: null,
      title: "",
      region: "",
      address: ""
    },
    areaValue: "",
    areaValueCity: "",
    areaData: [
      {
        value: "浙江",
        label: "浙江",
        children: [
          {
            value: "杭州",
            label: "杭州"
          }
        ]
      },
      {
        value: "江苏",
        label: "江苏",
        children: [
          {
            value: "南京",
            label: "南京"
          }
        ]
      },
      {
        value: "福建",
        label: "福建",
        children: [
          {
            value: "福州",
            label: "福州"
          },
          {
            value: "莆田",
            label: "莆田"
          }
        ]
      }
    ],
    historyArray: ["福州市鼓楼区851大楼", "福州长乐", "福州亚太"],
    dataSource: []
  };
  componentDidMount() {
    this.setState({ dataSource: this.getOptions(this.state.historyArray) });
  }
  getTitle = (resultLoaction, firstPoint) => {
    let title = firstPoint.title;
    if (!title && resultLoaction && resultLoaction.surroundingPois && resultLoaction.surroundingPois.length > 0) {
      title = resultLoaction.surroundingPois[0].title;
    }
    return title || "未知地点";
  };
  updateMarkerItem = (uid, newPointInfo) => {
    this.setState({
      markerList: this.state.markerList.map(item => {
        if (item.uid === uid) {
          return { ...item, ...newPointInfo };
        } else {
          return item;
        }
      })
    });
  };
  setPositionInfo = (endPoint, uid) => {
    console.log("setPositionInfo endPoint:", endPoint);
    geoc.getLocation(endPoint.point, resultLoaction => {
      console.log("resultLoaction:", resultLoaction);
      const positionInfo = resultLoaction.addressComponents;
      this.updateMarkerItem(uid, {
        point: endPoint.point,
        address: resultLoaction.address,
        province: positionInfo.province,
        city: positionInfo.city,
        title: `${this.getTitle(resultLoaction, endPoint)}`
      });
    });
  };
  onClickItem = ({ type, target, item }) => {
    console.log("type:", type, "target:", target, "item:", item);
    // this.mapNow.clearOverlays();
    var positionInfo = item.value;
    this.setState({
      keywordMap:
        positionInfo.province + positionInfo.city + positionInfo.district + positionInfo.street + positionInfo.business
    });
  };
  onChangeKeyword = keyword => {
    console.log("onChangeKeyword keyword:", keyword);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.setState({
        keyword: keyword || "",
        dataSource: !keyword ? this.getOptions(this.state.historyArray) : [] //没有关键字时使用历史记录
      });
    }, 200);
  };
  onClickMapInputSearch = keywordMap => {
    this.setState({
      keywordMap
    });
  };
  onAreaChange = areaValueArray => {
    const areaValue = areaValueArray && areaValueArray.join("");
    const areaValueCity = areaValueArray && areaValueArray[areaValueArray.length - 1];
    this.setState({
      areaValue,
      areaValueCity
    });
    geoc.getPoint(
      areaValue,
      point => {
        if (point) {
          this.setState({
            mapState: {
              ...this.state.mapState,
              zoom: 11,
              center: point
            }
          });
        }
      },
      areaValueCity
    );
  };
  getOptions = historyArray => {
    if (!historyArray || historyArray.length === 0) {
      return [];
    }
    return historyArray
      .map((historyItem, index) => (
        <Option key={index} value={historyItem}>
          <span>{historyItem}</span>
        </Option>
      ))
      .concat([
        <Option disabled key="del" className="del-item">
          <Button
            type="font"
            onClick={() => {
              this.setState({ dataSource: [], historyArray: [] });
            }}
          >
            清空搜索历史
          </Button>
        </Option>
      ]);
  };
  formatSearchData = searchResults => {
    let rows = searchResults.getNumPois();
    if (rows > 10) {
      rows = 10;
    }
    return Array(rows)
      .fill(0)
      .map((item, index) => searchResults.getPoi(index))
      .filter(item => !!item);
  };
  getOptionsBySearchResults = searchResults => {
    const countResult = searchResults && searchResults.getNumPois();
    console.log("countResult:", countResult);
    if (!searchResults || countResult === 0) {
      return [
        <Option disabled key="empty" className="empty-item">
          <p className="global-search-empty-text">未找到相关地点</p>
          <p className="global-search-empty-text">您还可以：</p>
          <ul className="global-search-empty-list">
            <li>检查输入是否正确或者输入其他词</li>
            <li>
              在网页中查找“<a
                className="global-search-empty-strong"
                target="_blank"
                href={`//www.baidu.com/s?wd=${searchResults.keyword}`}
              >
                {searchResults.keyword}
              </a>”
            </li>
            <li>进行意见反馈</li>
          </ul>
        </Option>
      ];
    } else {
      return this.formatSearchData(searchResults).map((item, index) => {
        return (
          <Option key={index} value={`${item.city}${item.district}${item.business}`}>
            <span>{`${item.business} `}</span>
            <span style={{ color: "gray" }}>{`${item.city}${item.district}`}</span>
          </Option>
        );
      });
    }
  };
  getMarker(pointInfo) {
    return (
      <Marker
        key={pointInfo.uid}
        {...pointInfo.markerProps}
        onClick={() => {
          if (this.state.hasSelect) {
            return;
          }
          if (this.lastClickMarker) {
            this.updateMarkerItem(this.lastClickMarker.uid, {
              iconProps: {
                ...this.lastClickMarker.iconProps,
                size: new NDMap.Size(20, 28),
                imageOffset: new NDMap.Size(-20 * this.lastClickMarker.iconProps.index, 0)
              },
              infoWindowProps: { show: false },
              markerProps: {
                ...this.lastClickMarker.markerProps,
                offset: new NDMap.Size(0, -10)
              }
            });
          }
          this.lastClickMarker = pointInfo;
          this.updateMarkerItem(pointInfo.uid, {
            iconProps: {
              ...pointInfo.iconProps,
              size: new NDMap.Size(28, 40),
              imageOffset: new NDMap.Size(-28 * pointInfo.iconProps.index, -28)
            },
            infoWindowProps: { show: true },
            labelProps: { show: false },
            markerProps: {
              ...pointInfo.markerProps,
              offset: new NDMap.Size(-4, -22)
            }
          });
          this.setState({
            mapState: {
              ...this.state.mapState,
              center: pointInfo.point
            }
          });
        }}
        onDragend={endPoint => {
          this.setPositionInfo(endPoint, pointInfo.uid);
        }}
        onMouseout={() => {
          setTimeout(() => {
            this.updateMarkerItem(pointInfo.uid, {
              labelProps: { show: false }
            });
          }, 0);
        }}
        onMouseover={() => {
          setTimeout(() => {
            this.updateMarkerItem(pointInfo.uid, {
              labelProps: { show: true }
            });
          }, 0);
        }}
      >
        <MarkerIcon {...pointInfo.iconProps} />
        <Label {...pointInfo.labelProps}>{`<p class="global-maplabel-text-main">${pointInfo.title ||
          ""}</p><p class="global-maplabel-text-sub">${pointInfo.province || ""}${pointInfo.city || ""}</p>`}</Label>
        {this.state.hasSelect ? null : (
          <SimpleInfoWindow
            {...pointInfo.infoWindowProps}
            contentEvents={{
              "confirmButton.click": (evt, markerInstance, infoWindowInstance) => {
                this.onClickMark(pointInfo, infoWindowInstance);
              }
            }}
          >
            <Row className="global-maplabel-wrap">
              <Col span={24} className="global-maplabel-content">
                <p className="global-maplabel-text-main">{`${pointInfo.title || ""}`}</p>
                <p className="global-maplabel-text-sub">{pointInfo.address || ""}</p>
              </Col>
              <Col span={8} className="global-maplabel-ctrl">
                <Button type="ghost" className="confirmButton">
                  确定
                </Button>
              </Col>
            </Row>
          </SimpleInfoWindow>
        )}
      </Marker>
    );
  }
  startSearch = keywordStart => {
    if (keywordStart) {
      let historyArray = this.state.historyArray;
      if (!historyArray.includes(keywordStart)) {
        historyArray.push(keywordStart);
      }
      this.setState({ historyArray, markerList: [] });
      this.localSearchDiv.search(keywordStart);
    }
  };
  onLocalSearchComplete = results => {
    var firstPoint = results && results.getPoi(0);
    console.log("onLocalSearchComplete results:", results, firstPoint);
    if (firstPoint) {
      this.setState({
        mapState: {
          ...this.state.mapState,
          viewport: this.formatSearchData(results).map(item => item.point)
        },
        markerList: this.formatSearchData(results).map((item, index) => {
          item.iconProps = {
            ...this.state.icon,
            size: new NDMap.Size(20, 28),
            index,
            imageOffset: new NDMap.Size(-20 * index, 0)
          };
          item.labelProps = { ...this.state.label, show: false };
          item.infoWindowProps = { show: false };
          item.markerProps = {
            ...this.state.markerState,
            point: item.point,
            offset: new NDMap.Size(0, -10)
          };
          return item;
        })
      });
    } else {
      alert("没找到");
    }
  };
  onClickMark = (pointInfo, infoWindowInstance) => {
    //react事件和百度地图InfoWindow事件冲突了，目前采用这种方式绑定事件
    this.updateMarkerItem(pointInfo.uid, {
      iconProps: {
        ...pointInfo.iconProps,
        size: new NDMap.Size(28, 40),
        imageOffset: new NDMap.Size(0, -68)
      }
    });
    this.setState({
      hasSelect: true,
      markerList: this.state.markerList.filter(item => item.uid === pointInfo.uid)
    });
    infoWindowInstance.close();
  };
  render() {
    return (
      <div className="tilemap-container-demo">
        <Row style={{ height: 50 }}>
          <Col span={6}>
            <Cascader
              size="large"
              options={this.state.areaData}
              onChange={this.onAreaChange}
              placeholder="请选择地区"
            />
          </Col>
          <Col span={13} offset={1}>
            <AutoComplete
              filterOption={false}
              allowClear
              className="global-search"
              dropdownClassName="global-search-search-dropdown"
              size="large"
              dataSource={this.state.dataSource}
              onChange={this.onChangeKeyword}
              onSelect={value => {
                this.startSearch(value);
              }}
              placeholder={`在 ${this.state.areaValue || "全国"} 搜索`}
              optionLabelProp="value"
            >
              <Input id="divSearch" />
            </AutoComplete>
          </Col>
          <Col span={3} offset={1}>
            <Button
              className="search-btn"
              size="large"
              type="primary"
              onClick={() => {
                this.startSearch(this.state.keyword);
              }}
            >
              搜索
            </Button>
          </Col>
        </Row>
        <Map
          setComponentInstance={mapNow => {
            this.mapNow = mapNow;
          }}
          className="tilemap-demo"
          {...this.state.mapState}
        >
          {this.state.markerList
            ? this.state.markerList.map((itemMarkerData, index) => {
                return this.getMarker(itemMarkerData);
              })
            : null}
          <CustomControl anchor={BMAP_ANCHOR_TOP_RIGHT}>
            <Search
              placeholder="全国搜索"
              id="mapSearch"
              style={{ width: 200 }}
              onSearch={this.onClickMapInputSearch}
            />
          </CustomControl>
          <AutocompleteMap input="mapSearch" onOnconfirm={this.onClickItem} />
          <LocalSearch keyword={this.state.keywordMap} onSearchComplete={this.onLocalSearchComplete} />
          <AutocompleteMap
            location={this.state.areaValueCity}
            keyword={this.state.keyword}
            onSearchComplete={results => {
              console.log("divSearch AutocompleteMap results:", results);
              if (results && results.keyword) {
                this.setState({
                  dataSource: this.getOptionsBySearchResults(results)
                });
              }
            }}
          />
          <LocalSearch
            setComponentInstance={localSearchDiv => {
              this.localSearchDiv = localSearchDiv;
            }}
            location={this.state.areaValueCity}
            onSearchComplete={this.onLocalSearchComplete}
          />
        </Map>
        <div id="error-ie8" />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.global-search-wrapper {
  padding-right: 50px;
}

.global-search {
  width: 100%;
}

/* ？ */
.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input:not(:last-child) {
  padding-right: 62px;
}
/* ？ */
.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 0;
}

.global-search-search-dropdown .ant-select-dropdown-menu-item {
  padding: 5px 12px 4px;
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.del-item {
  text-align: right;
  cursor: default;
  border-top: 1px solid #ddd;
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.del-item .ant-btn-font {
  font-size: 12px;
  color:#bbb;
  vertical-align:top;
  border:none;
  height:20px;
  line-height:20px;
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.empty-item {
  cursor: default;
  padding: 16px 20px;
}
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.custom-item {
  cursor: default;
}
.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix
  button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.global-search-empty-text {
  line-height:24px;
  font-size:12px;
  color:#666;
}
.global-search-empty-list li {
  position:relative;
  padding-left:8px;
  line-height:20px;
  font-size:12px;
  color:#666;
}
.global-search-empty-list li:before {
  position:absolute;
  left:0;
  top:50%;
  width:2px;
  height:2px;
  content:"";
  margin-top:-1px;
  background-color:#666;
}
.global-search-empty-strong {
  color:#3ba8f0;
}
.global-maplabel-wrap {
  position:relative;
  padding: 10px;
  padding-right: 54px;
}
.global-maplabel-ctrl {
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  width:54px;
  border-left:1px solid #ddd;
}
.global-maplabel-ctrl .confirmButton {
  width:100%;
  padding: 5px;
  border: none;
  font-size:12px;
  color: #3ba8f0;
  height: 100%;
  text-align:center;
}
.global-maplabel-ctrl .confirmButton:after {
  display: inline-block;
  vertical-align:middle;
  width: 0;
  height: 100%;
  content: "";
}
.global-maplabel-ctrl .confirmButton > span {
  display: inline-block;
  vertical-align:middle;
  margin: 0;
}
```
