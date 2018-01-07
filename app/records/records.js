import recordsController from './records.controller';
import recordsService from './records.service';
import baseTemplate from './views/conc-base.html';
import step1template from './views/conc-step1-invoice.html';
import step2template from './views/conc-step2-results.html';
import step3template from './views/conc-step3-custodians.html';
import baseTemplateReconc from './views/reconciliation-base.html';
import step1templateReconc from './views/reconciliation-step1-justify.html';
import step2templateReconc from './views/reconciliation-step2-review.html';
import recordTemplate from './records.html';

/** @ngInject **/
const recordsModule = angular.module('app.records', [])
  .controller('RecordsCtrl', recordsController)
  .service('RecordsService', recordsService)
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
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
      })
      .state('dashboard.reconciliation', {
        abstract: true,
        url: '/reconciliation',
        template: baseTemplateReconc,
        controller: 'RecordsCtrl as ctrl',
      })
      .state('dashboard.reconciliation.step1', {
        url: '/step1',
        template: step1templateReconc,
        controller: 'RecordsCtrl as ctrl',
        resolve: {
          notifications: (NotificationService) =>
            NotificationService.getNotifications(),
        }
      })
      .state('dashboard.reconciliation.step2', {
        url: '/step2',
        template: step2templateReconc,
        controller: 'RecordsCtrl as ctrl',
      })
      .state('dashboard.records', {
        url: '/records',
        template: recordTemplate,
        controller: 'RecordsCtrl as ctrl',
        resolve: {
          records: (CardUsageService) => {
            return CardUsageService.getCardsUsages();
          },
          departments: (DepartmentsService) =>
            DepartmentsService.getDepartments(),
          users: (UsersService) =>
            UsersService.getUsers()
        }
      });

    $urlRouterProvider.when('/dashboard/conc', '/dashboard/conc/step1');
    $urlRouterProvider.when('/dashboard/reconciliation', '/dashboard/reconciliation/step1');
  }).name;

export default recordsModule;
