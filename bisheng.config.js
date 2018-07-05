const path = require('path')
const basePath = __dirname
const nodeModulesPath = path.join(basePath, 'node_modules') // node_modules路径
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default

module.exports = {
  port: 8003,
  source: {
    components: './src',
    changelog: ['CHANGELOG.md']
  },
  output: './site',
  theme: '@sdp.nd/bisheng-theme-component',
  htmlTemplate: "./template.html",
  themeConfig: {
    title: 'nd-tile-map',
    github: 'http://git.sdp.nd/component-h5/nd-tile-map'
  },
  doraConfig: {
    verbose: true,
    plugins: ['dora-plugin-upload']
  },
  webpackConfig: config => {
    config.resolve.alias = {
      'fish/lib': '@sdp.nd/fish/lib',
      fish: '@sdp.nd/fish',
      '@sdp.nd/nd-tile-map': path.join(process.cwd(), 'src/index'),
      'react-router': 'react-router/umd/ReactRouter'
    }
    config.babel.plugins.push([
      require.resolve('babel-plugin-transform-runtime'),
      {
        polyfill: false,
        regenerator: true
      }
    ])
    config.babel.plugins.push(
      require.resolve('babel-plugin-transform-es3-member-expression-literals')
    )
    config.babel.plugins.push(
      require.resolve('babel-plugin-transform-es3-property-literals')
    )
    config.babel.plugins.push([
      require.resolve('babel-plugin-import'),
      { libraryName: 'fish', libraryDirectory: 'lib', style: true }
    ])
    config.postcss.push(require('postcss-color-rgba-fallback'))
    config.module.postLoaders = [
      {
        test: /\.(js|jsx|md)$/,
        loaders: ['es3ify-loader']
      }
    ]
    // 拆分css,兼容IE8，9
    config.plugins.push(new CSSSplitWebpackPlugin({ size: 4000 }))
    return config
  }
}
