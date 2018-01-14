/**
 * Created by diegofigs on 2/26/17.
 */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractText = new ExtractTextPlugin({
  filename: '[name]-styles.css',
  allChunks: true,
  disable: process.env.NODE_ENV === 'development'
});
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve('./app/app.js')
  },
  output: {
    path: path.resolve('./dist/'),
    publicPath: process.env.ASSET_PATH || '/',
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
        loader: extractText.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },

      {
        test: /\.scss$/,
        use: extractText.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ]
        })
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
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      moment: 'moment'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./app/index.html'),
      favicon: 'app/favicon.ico',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      filename: '[name].bundle.js',
      minChunks: function(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    extractText,
    // new BundleAnalyzerPlugin()
  ],
  resolve : {
    extensions : ['.js', '.jsx']
  },
  target: 'web'
};
