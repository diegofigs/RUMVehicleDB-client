import departmentsService from './departments.service';

/** @ngInject */
const departmentsModule = angular.module('app.departments', [])
  .service('DepartmentsService', departmentsService)
  .name;

/**
 * Departments is in charge of being a wrapper for pulling
 * departments inside the application.
 * @type {string}
 * @return {string} 'app.departments'
 */
export default departmentsModule;
