const path = require('path')
const pkg = require(path.join(process.cwd(), 'package.json'))
const HtmlWebpackInjectPlugin = require('html-webpack-inject-plugin');

const cname = pkg.name
module.exports = {
  root: `/${cname.substring(cname.indexOf('/') + 1, cname.length)}/site/`,
  source: ['README.md', 'CHANGELOG.md'],
  engine: 'md-tools-engine-react',
  themeConfig: {
    title: cname,
    github: pkg.homepage
  },
  theme: 'md-tools-theme-component-react',
  webpackConfig: config => {
    const alias = {
      'fish/lib': '@sdp.nd/fish/lib',
      fish: '@sdp.nd/fish',
      'react-router': 'react-router/umd/ReactRouter'
    }
    alias[cname + '/lib'] = path.join(process.cwd(), 'src') // 必须alias[cname]上方
    alias[cname] = path.join(process.cwd(), 'src')
    config.resolve.alias = alias

    config.plugins.push(
      new HtmlWebpackInjectPlugin({
        externals: [
          {
            tag: 'script',
            attrs: {
              src: '//api.map.baidu.com/api?v=3.0&s=1&ak=zIT2dNIgEojIIYjD91wIbiespAnwM0Zu',
              type: 'text/javascript',
            },
          },
        ],
      }),
    );

    return config
  }
}
