
import dashboardModule from './dashboard/dashboard';
import authModule from './auth/auth';
import toDate from './filters/to-date.filter';
import capitalize from './filters/capitalize.filter';

/**
 * @ngInject
 */
const coreModule = angular.module('core', [
  authModule,
  dashboardModule,
]).filter('toDate', toDate)
  .filter('capitalize', capitalize)
  .name;

export default coreModule;
