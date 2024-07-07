const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const isDev = process?.env?.NODE_ENV === 'development'
if (isDev) dotenv.config()

module.exports = {
  entry: {
    app: '/src/index.tsx',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(css)$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg)$/i,
        include: [path.resolve(__dirname, '../src')],
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff|woff2|ttf)$/i,
        include: {
          not: [path.resolve(__dirname, '../src')],
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chit Chat AI',
      template: './public/index.html',
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
}
