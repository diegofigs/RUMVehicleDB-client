/**
 * Created by diegofigs on 2/27/17.
 */
import dashboardModule from './dashboard/dashboard';
import authModule from './auth/auth';
import toDate from './filters/to-date.filter';

/**
 * @ngInject
 */
const coreModule = angular.module('core', [
  authModule,
  dashboardModule,
]).filter('toDate', toDate)
  .name;

export default coreModule;
