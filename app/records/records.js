import recordsController from './records.controller';
import recordsService from './records.service';
import step1template from './views/conc-invoice-step1.html';
import step2template from './views/conc-results-step2.html';

/** @ngInject **/
const recordsModule = angular.module('app.records', [])
  .controller('RecordsCtrl', recordsController)
  .service('RecordsService', recordsService)
  .config(function ($locationProvider, $stateProvider) {
    $stateProvider
      .state('dashboard.step1', {
        url: '/conciliation-step1',
        template: step1template,
        controller: 'RecordsCtrl as ctrl',
      })
      .state('dashboard.step2', {
        url: '/conciliation-step2',
        template: step2template,
        controller: 'RecordsCtrl as ctrl',
      });
  }).name;

export default recordsModule;
