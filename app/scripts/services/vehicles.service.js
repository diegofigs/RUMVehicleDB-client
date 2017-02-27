'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .factory('VehiclesService', function($http, $log, AuthService) {
    var baseDomain = 'http://67.205.175.113/api/v1';
    var resource = '/vehicles';
    var vehicle = {
      vehicles: [],
      vehicle: {}
    };
    vehicle.getVehicles = function() {
      vehicle.vehicles = $http.get(baseDomain + resource, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).then(function(response) {
        vehicle.vehicles = response.data.data;
        return response.data.data;
      })
        .catch(function(error) {
          $log.log(error);
        });
      return vehicle.vehicles;
    };
    vehicle.getVehicle = function(id) {
      return $http.get(baseDomain + resource + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).then(function(response) {
        vehicle.vehicle = response.data.data;
        return response.data.data;
      })
        .catch(function(error) {
          $log.log(error);
        });
    };
    vehicle.createVehicle = function(vehicle) {
      return $http.post(baseDomain + resource, vehicle, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
        $log.log(error);
      });
    };
    vehicle.deleteVehicle = function(vehicle) {
      return $http.delete(baseDomain + resource + '/' + vehicle.id, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
        $log.log(error);
      });
    };
    vehicle.editVehicle = function(vehicle) {
      return $http.put(baseDomain + resource + '/' + vehicle.id, vehicle, {
        headers: {
          Authorization: 'Bearer ' + AuthService.getToken()
        }
      }).catch(function(error) {
        $log.log(error);
      });
    };
    return vehicle;
  });
