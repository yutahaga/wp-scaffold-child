var isProduction = process.env.NODE_ENV === 'production'

var chalk = require('chalk')
var webpack = require('webpack')
var config = isProduction ? require('./webpack.prod.conf') : require('./webpack.dev.conf')

webpack(config, function (err, stats) {
  if (err) {
    throw err
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
})
