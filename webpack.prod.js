const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config');

//noinspection JSUnresolvedFunction
module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.API': JSON.stringify(process.env.API)
    })
    // new BundleAnalyzerPlugin()
  ]
});
