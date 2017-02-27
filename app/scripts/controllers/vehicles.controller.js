/**
 * Created by diegofigs on 1/31/17.
 */
'use strict';

window.appVersion = 2.0;
angular.module('MaterialApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('vehicles', {
        url: '/vehicles',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/vehicles/vehicles.html?v=' + window.appVersion,
        controller: 'VehiclesCtrl',
        resolve: {
          vehicles: function(VehiclesService) {
            return VehiclesService.getVehicles();
          }
        }
      })
      .state('vehicles.add', {
        url: '/vehicles/add',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/vehicles/add-vehicle.html?v=' + window.appVersion,
        controller: 'VehiclesCtrl',
        resolve: {
          departments: function(DepartmentsService) {
            return DepartmentsService.getDepartments();
          }
        }
      })
      .state('vehicles.view', {
        url: '/vehicles/:id',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/vehicles/view-vehicle.html?v=' + window.appVersion,
        controller: 'VehiclesCtrl',
        resolve: {
          vehicle: function($stateParams, VehiclesService) {
            return VehiclesService.getVehicle($stateParams.id);
          }
        }
      })
      .state('vehicles.edit', {
        url: '/vehicles/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard' +
        '/vehicles/edit-vehicle.html?v=' + window.appVersion,
        controller: 'VehiclesCtrl',
        resolve: {
          vehicle: function($stateParams, VehiclesService) {
            return VehiclesService.getVehicle($stateParams.id);
          },
          departments: function(DepartmentsService) {
            return DepartmentsService.getDepartments();
          }
        }
      });
  })
  .controller('VehiclesCtrl',
    function($scope, $state, $log,
             AuthService, DepartmentsService, VehiclesService) {
      $scope.vehicles = VehiclesService.vehicles;
      $scope.vehicle = VehiclesService.vehicle;
      $scope.departments = DepartmentsService.departments;
      $scope.newVehicle = {};
      $scope.createVehicle = function() {
        $scope.newVehicle.custodian_id = AuthService.getUser().id;
        $log.log($scope.newVehicle);
        return VehiclesService.createVehicle($scope.newVehicle)
          .then(function(response) {
          $log.log(response);
          $state.go('vehicles');
        });
      };
      $scope.deleteVehicle = function(vehicle) {
        return VehiclesService.deleteVehicle(vehicle).then(function(response) {
          $log.log(response);
          $state.reload();
        });
      };
      $scope.editVehicle = function() {
        return VehiclesService.editVehicle($scope.vehicle)
          .then(function(response) {
          $log.log(response);
          $state.go('vehicles');
        });
      };
    });
