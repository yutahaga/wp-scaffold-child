var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  watch: true,
  plugins: [
    new BrowserSyncPlugin({
      host: config.host,
      port: config.port,
      proxy: config.proxy,
      open: config.autoOpenBrowser
    })
  ]
})

module.exports = webpackConfig
