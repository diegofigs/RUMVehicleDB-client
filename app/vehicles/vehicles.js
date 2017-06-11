/**
 * Created by diegofigs on 3/28/17.
 */
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
          vehicles: (VehiclesService) => {
            return VehiclesService.getVehicles();
          }
        }
      })
      .state('dashboard.vehicles.add', {
        url: '/add',
        template: vehiclesAddTemplate,
        controller: 'VehiclesCtrl as ctrl',
        resolve: {
          departments: (DepartmentsService) => {
            return DepartmentsService.getDepartments();
          }
        }
      })
      .state('dashboard.vehicles.view', {
        url: '/:id',
        template: vehiclesViewTemplate,
        controller: 'VehiclesCtrl as ctrl',
        resolve: {
          vehicle: ($stateParams, VehiclesService) => {
            return VehiclesService.getVehicle($stateParams.id);
          }
        }
      })
      .state('dashboard.vehicles.edit', {
        url: '/:id/edit',
        template: vehiclesEditTemplate,
        controller: 'VehiclesCtrl as ctrl',
        resolve: {
          vehicle: ($stateParams, VehiclesService) => {
            return VehiclesService.getVehicle($stateParams.id);
          },
          departments: (DepartmentsService) => {
            return DepartmentsService.getDepartments();
          }
        }
      });
  })
  .service('VehiclesService', vehiclesService)
  .controller('VehiclesCtrl', vehiclesController)
  .name;

export default vehiclesModule;
