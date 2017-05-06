var pkg = require('../package.json')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var isProduction = process.env.NODE_ENV === 'production'

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isProduction ? config.cssnano : false,
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    loaders.push({
      loader: 'postcss-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap
      })
    })

    loaders.push({
      loader: 'string-replace-loader',
      query: {
        multiple: [
          { search: '/*!', replace: '\n/*!' },
          { search: '{% version %}', replace: pkg.version }
        ]
      }
    })

    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'style-loader'
    })
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

exports.styleLoaders = function (options) {
  var loaders = exports.cssLoaders(options)
  return Object.keys(loaders).map(extension => {
    return {
      test: new RegExp('\\.' + extension + '$'),
      use: loaders[extension]
    }
  })
}
