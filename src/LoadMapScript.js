export default function (appKey, callbackName) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `//api.map.baidu.com/api?v=3.0&ak=${appKey}&callback=${callbackName}`
  document.body.appendChild(script)
}
