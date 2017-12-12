import recordsController from './records.controller';
import recordsService from './records.service';
import baseTemplate from './views/conc-base.html';
import step1template from './views/conc-step1-invoice.html';
import step2template from './views/conc-step2-results.html';
import step3template from './views/conc-step3-custodians.html';

/** @ngInject **/
const recordsModule = angular.module('app.records', [])
  .controller('RecordsCtrl', recordsController)
  .service('RecordsService', recordsService)
  .config(function ($locationProvider, $stateProvider) {
    $stateProvider
      .state('dashboard.conciliation', {
        abstract: true,
        url: '/conc',
        template: baseTemplate,
        controller: 'RecordsCtrl as ctrl',
      })
      .state('dashboard.conciliation.step1', {
        url: '/step1',
        template: step1template,
        controller: 'RecordsCtrl as ctrl',
      })
      .state('dashboard.conciliation.step2', {
        url: '/step2',
        template: step2template,
        controller: 'RecordsCtrl as ctrl',
      })
      .state('dashboard.conciliation.step3', {
        url: '/step3',
        template: step3template,
        controller: 'RecordsCtrl as ctrl',
      });
  }).name;

export default recordsModule;
