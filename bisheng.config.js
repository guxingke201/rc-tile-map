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
        loaders: ['es3ify-loader'],
        include: [
          path.join(basePath, 'src'),
          // 重新编译node_modules下的一些库，让他们支持ie8
          path.join(nodeModulesPath, '@sdp.nd'),
          path.join(nodeModulesPath, 'react-copy-to-clipboard'),
          path.join(nodeModulesPath, 'react-color-standalone'),
          path.join(nodeModulesPath, 'deep-eql'),
          path.join(nodeModulesPath, 'style-utils'),
          path.join(nodeModulesPath, 'exist.js'),
          path.join(nodeModulesPath, 'regenerator-runtime'),
          path.join(nodeModulesPath, 'jsonml-to-react-element'),
          path.join(nodeModulesPath, 'react-side-effect'),
          path.join(nodeModulesPath, 'react-router'),
          path.join(nodeModulesPath, 'lodash'),
          path.join(nodeModulesPath, 'babel-runtime'),
          path.join(nodeModulesPath, 'react-slick'),
          path.join(nodeModulesPath, 'babel-polyfill'),
          path.join(nodeModulesPath, 'prop-types')
        ]
      }
    ]
    // 拆分css,兼容IE8，9
    config.plugins.push(new CSSSplitWebpackPlugin({ size: 4000 }))
    return config
  }
}
