export const MapPropTypes = require('./propTypes')

export const Map = require('./Map')
export const MapComponent = require('./MapComponent')
export const MapLayer = require('./MapLayer')
// 图层
export const TileLayer = require('./TileLayer')
// 覆盖物
export const OverLayer = require('./overLayer/OverLayer')
export const Marker = require('./overLayer/Marker')
export const InfoWindow = require('./overLayer/InfoWindow')
export const Polyline = require('./overLayer/Polyline')
export const MarkerIcon = require('./overLayer/Icon')
export const Label = require('./overLayer/Label')
export const Polygon = require('./overLayer/Polygon')
export const Circle = require('./overLayer/Circle')
export const InfoBox = require('./overLayer/InfoBox')
export const SimpleInfoWindow = require('./overLayer/SimpleInfoWindow')
// 控件
export const MapControl = require('./control/MapControl')
export const ScaleControl = require('./control/ScaleControl')
export const CopyrightControl = require('./control/CopyrightControl')
export const GeolocationControl = require('./control/GeolocationControl')
export const MapTypeControl = require('./control/MapTypeControl')
export const NavigationControl = require('./control/NavigationControl')
export const OverviewMapControl = require('./control/OverviewMapControl')
export const PanoramaControl = require('./control/PanoramaControl')
// export const CityListControl = require('./control/CityListControl') //ie8下js异常，样式异常，不开放了
export const CustomControl = require('./control/CustomControl')
// 服务类
export const AutocompleteMap = require('./service/Autocomplete')
export const LocalSearch = require('./service/LocalSearch')
// Web版百度地图面向PC&移动端浏览器的网站应用或移动APP应用，其中PC浏览器调起的百度地图地址为：http://map.baidu.com/
// http://lbsyun.baidu.com/index.php?title=uri/api/web#service-page-anchor8
export const MapLinkMarker = require('./mapLink/Marker')
export const MapLinkDirection = require('./mapLink/Direction')
export const MapLinkGeocoder = require('./mapLink/Geocoder')
export const MapLinkLine = require('./mapLink/Line')
export const MapLinkPano = require('./mapLink/Pano')
export const MapLinkPlaceDetail = require('./mapLink/PlaceDetail')
export const MapLinkPlaceSearch = require('./mapLink/PlaceSearch')

export const LoadMapScript = require('./LoadMapScript')
export const NDMap = BMap
