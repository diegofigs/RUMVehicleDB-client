import vehiclesController from './vehicles.controller';
import vehiclesService from './vehicles.service';

import baseTemplate from '../core/base.html';
import vehiclesTemplate from './vehicles.html';
import vehiclesAddTemplate from './views/add-vehicle.html';
import vehiclesEditTemplate from './views/edit-vehicle.html';
import vehiclesViewTemplate from './views/view-vehicle.html';

/** @ngInject */
const vehiclesModule = angular.module('app.vehicles', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.vehicles', {
        abstract: true,
        url: '/vehicles',
        template: baseTemplate,
      })
      .state('dashboard.vehicles.list', {
        url: '/list',
        template: vehiclesTemplate,
        controller: 'VehiclesCtrl as ctrl',
        resolve: {
          vehicles: (VehiclesService) =>
            VehiclesService.getVehicles({was_archived: 0}),
          departments: (DepartmentsService) =>
            DepartmentsService.getDepartments(),
          users: (UsersService) =>
            UsersService.getUsers(),
          vehicleTypes: (VehiclesService) =>
            VehiclesService.getVehicleTypes()
        },
      })
      .state('dashboard.vehicles.add', {
        url: '/add',
        template: vehiclesAddTemplate,
        controller: 'VehiclesCtrl as ctrl',
        resolve: {
          departments: (DepartmentsService) =>
            DepartmentsService.getDepartments(),
          vehicleTypes: (VehiclesService) =>
            VehiclesService.getVehicleTypes()
        },
      })
      .state('dashboard.vehicles.view', {
        url: '/:id',
        template: vehiclesViewTemplate,
        controller: 'VehiclesCtrl as ctrl',
        resolve: {
          vehicle: ($stateParams, VehiclesService) =>
            VehiclesService.getVehicle($stateParams.id)
        },
      })
      .state('dashboard.vehicles.edit', {
        url: '/:id/edit',
        template: vehiclesEditTemplate,
        controller: 'VehiclesCtrl as ctrl',
        resolve: {
          vehicle: ($stateParams, VehiclesService) =>
            VehiclesService.getVehicle($stateParams.id),
          departments: (DepartmentsService) =>
            DepartmentsService.getDepartments(),
          vehicleTypes: (VehiclesService) =>
            VehiclesService.getVehicleTypes()
        },
      });
  })
  .service('VehiclesService', vehiclesService)
  .controller('VehiclesCtrl', vehiclesController)
  .name;

/**
 * Vehicles is in charge of encapsulating all functionality
 * related to vehicles inside the application.
 * This angular module declares all states from
 * the vehicles sub tree of views.
 * @type {string}
 * @return {string} 'app.vehicles'
 */
export default vehiclesModule;
