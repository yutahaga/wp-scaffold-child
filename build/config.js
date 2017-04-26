var path = require('path')
var isProduction = process.env.NODE_ENV === 'production'

var themeName = 'child'

function resolve (file) {
  var args = [__dirname, '..'].concat(Array.from(arguments))
  return path.join.apply(this, args)
}

var config = {
  themeRoot: resolve('public_html/wp/wp-content/themes', themeName),
  themeSrc: resolve('src', themeName),
  sourceMap: !isProduction,
  gzip: isProduction,
  gzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: true,
  host: 'localhost',
  port: 3000,
  proxy: 'localhost:8080',
  autoOpenBrowser: true
}

module.exports = config
