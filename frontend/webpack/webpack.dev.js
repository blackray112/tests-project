const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: '3000',
    historyApiFallback: true,
  },
  output: {
    filename: '[name].dev.remote.host.js',
    publicPath: 'http://localhost:3000/',
  },
})
