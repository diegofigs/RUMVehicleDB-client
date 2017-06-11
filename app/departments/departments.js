/**
 * Created by diegofigs on 3/5/17.
 */
import departmentsService from './departments.service';
/**
 * @ngInject
 */
const departmentsModule = angular.module('app.departments', [])
  .service('DepartmentsService', departmentsService)
  .name;

export default departmentsModule;
