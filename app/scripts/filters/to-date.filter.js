/**
 * Created by diegofigs on 2/26/17.
 */
'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .filter('toDate', function() {
    return function(input) {
      var date = moment(input);
      return date.toDate();
    };
  });
