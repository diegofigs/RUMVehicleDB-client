import angular from 'angular';
import mocks from 'angular-mocks';
import appModule from './app/app';

// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
let context = require.context("./app", true, /\.spec\.js/);
context.keys().forEach(context);
