const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config');

//noinspection JSUnresolvedFunction
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve('./public/'),
    compress: true,
    port: 9000,
    proxy: {
      "/api/v1": process.env.API
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.API': JSON.stringify(process.env.API)
    })
  ]
});
