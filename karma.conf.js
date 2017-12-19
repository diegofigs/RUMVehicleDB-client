const webpack = require('./webpack.config.test');

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["mocha", "chai", "sinon"],

    // This will be the new entry to webpack
    // so it should just be a single file
    files: [
      "spec.bundle.js",
    ],

    // list of files to exclude
    exclude: [],

    // Preprocess test index and test files using
    // webpack (will run babel)
    preprocessors: {
      "spec.bundle.js": ["webpack", "sourcemap"],
      "app/**/*.spec.js": ["webpack", "sourcemap"]
    },

    // Reference webpack config (single object)
    // and configure some middleware settings
    webpack,
    webpackServer: {
      noInfo: false // prevent console spamming when running in Karma!
    },

    // Typical Karma settings, see docs
    reporters: ["mocha"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["PhantomJS"],
    singleRun: false,
    plugins: [
      require('karma-webpack'),
      require('karma-chai'),
      require('karma-mocha'),
      require('karma-sinon'),
      require('karma-mocha-reporter'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader')
    ]
  });
};
