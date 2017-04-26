var config = require('./config')
var path = require('path')
var merge = require('webpack-merge')
var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.conf')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var ImageminPlugin = require('imagemin-webpack-plugin').default

var webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: config.sourceMap
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new ImageminPlugin({
      test: path.posix.resolve(path.join(config.themeSrc, '**')),
      pngquant: {
        quality: '95-100'
      }
    })
  ]
})

if (config.gzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.gzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
