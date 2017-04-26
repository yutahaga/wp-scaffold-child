var path = require('path')
var utils = require('./utils')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var baseConfig = {
  entry: {
    app: path.join(config.themeSrc, 'assets/js/app.js')
  },
  output: {
    path: path.resolve(config.themeRoot, 'assets'),
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.join(config.themeSrc, 'assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: config.themeSrc,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: config.themeSrc
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(config.themeSrc, 'assets/images'),
        to: 'images',
        ignore: ['.*', 'Thumbs.db']
      },
      {
        from: path.join(config.themeSrc, '*'),
        to: '../',
        flatten: true,
        ignore: ['.*', 'Thumbs.db']
      }
    ])
  ]
}

baseConfig.module.rules = baseConfig.module.rules.concat(utils.styleLoaders({
  sourceMap: config.SourceMap,
  extract: true
}))

module.exports = baseConfig
