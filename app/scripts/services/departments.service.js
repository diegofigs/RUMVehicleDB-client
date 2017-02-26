'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .factory('DepartmentsService', function($http, $log, AuthService) {
    var baseDomain = 'http://67.205.175.113/api/v1';
    var resource = '/departments';
    var department = {
      departments: []
    };
    department.getDepartments = function() {
      department.departments = $http.get(baseDomain + resource, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).then(function(response) {
        department.departments = response.data;
        $log.log(department.departments);
        return response.data.data;
      })
        .catch(function(error) {
          $log.log(error);
        });
      return department.departments;
    };
    return department;
  });
