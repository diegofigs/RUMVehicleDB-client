const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config');

//noinspection JSUnresolvedFunction
module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PORT': JSON.stringify(3000),
      'process.env.HOST': JSON.stringify('http://dev.uprm.edu/rumvehicles')
    })
    // new BundleAnalyzerPlugin()
  ]
});
