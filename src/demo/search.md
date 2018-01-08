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
  Autocomplete as AutocompleteMap,
  LocalSearch,
  Marker,
  MarkerIcon,
  InfoWindow,
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
  state = {
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
      offset: new NDMap.Size(20, -10)
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
    historyArray: ["福州长乐", "福州亚太"],
    dataSource: []
  };
  componentDidMount() {
    this.setState({ dataSource: this.getOptions(this.state.historyArray) });
  }
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
  setPositionInfo = (firstPoint, uid) => {
    console.log("firstPoint:", firstPoint);
    geoc.getLocation(firstPoint.point, resultLoaction => {
      console.log("resultLoaction:", resultLoaction);
      const positionInfo = resultLoaction.addressComponents;
      this.updateMarkerItem(uid, {
        point: firstPoint.point,
        address: `${positionInfo.street}${positionInfo.streetNumber}`,
        title: `${this.getTitle(resultLoaction, firstPoint)}`
      });
    });
  };
  onClickItem = ({ type, target, item }) => {
    console.log("type:", type, "target:", target, "item:", item);
    // this.mapNow.clearOverlays();
    var positionInfo = item.value;
    this.setState({
      keywordMap:
        positionInfo.province +
        positionInfo.city +
        positionInfo.district +
        positionInfo.street +
        positionInfo.business
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
    const areaValueCity =
      areaValueArray && areaValueArray[areaValueArray.length - 1];
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
  getOptionsBySearchResults = searchResults => {
    const countResult = searchResults && searchResults.getNumPois();
    console.log("countResult:", countResult);
    if (!searchResults || countResult === 0) {
      return [
        <Option disabled key="empty" className="empty-item">
          <span>未找到相关地点</span>
        </Option>
      ];
    } else {
      return searchResults.tr.map((item, index) => {
        return (
          <Option
            key={index}
            value={`${item.city}${item.district}${item.business}`}
          >
            <span>{`${item.business} `}</span>
            <span style={{ color: "gray" }}>{`${item.city}${
              item.district
            }`}</span>
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
        point={pointInfo.point}
        onClick={() =>
          this.updateMarkerItem(pointInfo.uid, {
            iconProps: {
              ...pointInfo.iconProps,
              size: new NDMap.Size(28, 40),
              imageOffset: new NDMap.Size(-28 * pointInfo.iconProps.index, -28)
            }
          })
        }
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
        <Label {...pointInfo.labelProps}>{pointInfo.title}</Label>
        <InfoWindow>
          <Row>
            <Col span={16}>
              <p>{`${pointInfo.title}`}</p>
              <p>{pointInfo.address}</p>
            </Col>
            <Col span={8}>
              <Button type="ghost" icon="check" onClick={this.onClickMark}>
                确认地址
              </Button>
            </Col>
          </Row>
        </InfoWindow>
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
    var firstPoint = results && results.getPoi(0); //获取第一个智能搜索的结果
    console.log("onLocalSearchComplete results:", results, firstPoint);
    if (firstPoint) {
      this.setState({
        mapState: {
          ...this.state.mapState,
          viewport: results.tr.map(item => item.point)
        },
        markerList: results.tr.map((item, index) => {
          item.iconProps = {
            ...this.state.icon,
            size: new NDMap.Size(20, 28),
            index,
            imageOffset: new NDMap.Size(-20 * index, 0)
          };
          item.labelProps = { ...this.state.label, show: false };
          item.markerProps = { ...this.state.markerState };
          return item;
        })
      });
    } else {
      alert("没找到");
    }
  };
  onClickMark = () => {
    this.updateMarkerItem(pointInfo.uid, {
      iconProps: {
        ...pointInfo.iconProps,
        imageOffset: new NDMap.Size(-40, 0)
      }
    });
    this.setState({
      markerList: this.state.markerList.filter(
        item => item.uid === pointInfo.uid
      )
    });
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
          <Col span={15}>
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
          <Col span={3}>
            <Button
              className="search-btn"
              size="large"
              type="primary"
              onClick={() => {
                this.startSearch(this.state.keyword);
              }}
            >
              <Icon type="search" />
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
          <LocalSearch
            keyword={this.state.keywordMap}
            onSearchComplete={this.onLocalSearchComplete}
          />
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

.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input:not(:last-child) {
  padding-right: 62px;
}

.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 0;
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.del-item {
  text-align: right;
  cursor: default;
}
.global-search-search-dropdown .ant-select-dropdown-menu-item.empty-item {
  color:gray;
  cursor: default;
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
```
