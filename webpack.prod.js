/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'src'),
  jsout: path.join(__dirname, 'dist'),
  htmlout: path.join(__dirname),
};

module.exports = {
  entry: {
    'Snapshot.min': ['babel-polyfill', `${PATHS.source}/index.js`],
    vendor: ['react'],
  },
  devtool: 'eval-source-map',
  output: {
    path: PATHS.jsout,
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader?name=images/[name].[ext]' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader?name=fonts/[name].[ext]' },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('uikit.css'),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      sourceMap: true,
      mangle: true,
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity,
    }),
  ],
};
