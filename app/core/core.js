
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

/**
 * Core is in charge of encapsulating all functionality
 * common to the whole application domain.
 * @type {string}
 * @return {string} 'core'
 */
export default coreModule;
