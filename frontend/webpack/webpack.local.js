const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin')
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const common = require('./webpack.common.js')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

delete common.plugins

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: '3000',
    historyApiFallback: true,
  },
  output: {
    filename: '[name].dev.host.js',
    publicPath: 'http://localhost:3000/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chit Chat AI',
      template: '/public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        REACT_APP_API_BASE_URL: JSON.stringify(
          process.env.REACT_APP_API_BASE_URL,
        ),
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new RetryChunkLoadPlugin({
      cacheBust: `function () {
        return Date.now();
      }`,
      retryDelay: `function (retryAttempt) {
        return retryAttempt * 100;
      }`,
      maxRetries: 5,
    }),
    new FaviconsWebpackPlugin('./webpack/favicon.jpg'),
  ],
})
