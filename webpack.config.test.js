const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve('./public/'),
    compress: true,
    port: 9000,
  },
  entry: {
    app: path.resolve('./app/app.js')
  },
  output: {
    path: path.resolve('./dist/'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      },

      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /.html$/,
        loaders: [
          'html-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /.eot$/,
        loader: 'url-loader'
      },
      {
        test: /.(woff|woff2)$/,
        loader: 'url-loader'
      },
      {
        test: /.ttf$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      moment: 'moment'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./app/index.html'),
      inject: 'body'
    }),
  ],
  resolve : {
    extensions : ['.js', '.jsx']
  },
  target: 'web'
};
