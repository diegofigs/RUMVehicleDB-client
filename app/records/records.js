import recordsController from './records.controller';
import recordsService from './records.service';
import baseTemplate from './views/conc-base.html';
import step1template from './views/conc-step1-invoice.html';
import step2template from './views/conc-step2-results.html';
import recordJustification from './views/record-justification.html';
import justificationApproval from './views/justification-approval.html';
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
      .state('dashboard.justification', {
        url: '/justification',
        template: recordJustification,
        controller: 'RecordsCtrl as ctrl',
        resolve: {
          notifications: (NotificationService) =>
            NotificationService.getNotifications(),
        }
      })
      .state('dashboard.approval', {
        url: '/approval',
        template: justificationApproval,
        controller: 'RecordsCtrl as ctrl',
        resolve: {
          notifications: (NotificationService) =>
            NotificationService.getNotifications(),
        }
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
            UsersService.getUsers(),
          reportDates: (RecordsService) =>
            RecordsService.getReportDates(),
        }
      });

    $urlRouterProvider.when('/dashboard/conc', '/dashboard/conc/step1');
    $urlRouterProvider.when('/dashboard/reconciliation', '/dashboard/reconciliation/step1');
  }).name;

export default recordsModule;


