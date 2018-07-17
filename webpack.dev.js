/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'src'),
  jsout: path.join(__dirname, 'dist'),
  htmlout: path.join(__dirname),
};

const styleOpts = {
  configFile: path.join(__dirname, '.stylelintrc'),
  context: path.join(__dirname, 'style'),
  files: '**/*.scss',
};

module.exports = {
  entry: {
    'Snapshot': [
      'babel-polyfill',
      'react-hot-loader/patch',
      `${PATHS.source}/index.js`
    ],
    vendor: [
      'react'
    ],
  },
  output: {
    path: PATHS.jsout,
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      { test: /\.(js|jsx)?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ]
        })
      },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader?name=images/[name].[ext]' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader?name=fonts/[name].[ext]' },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js', 'uikit.css']
    }),
    new HtmlWebpackPlugin({
      filename: `${PATHS.jsout}/index.html`,
      template: './index.html',
      title: 'UI Kit',
    }),
    new StyleLintPlugin(styleOpts),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 9000,
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    open: true,
    publicPath: 'http://localhost:9000/',
  }
};
