/**
 * Created by diegofigs on 3/5/17.
 */

/**
 * Departments Service is in charge of API calls (GET)
 * related to UPRM's departments
 */

export default class DepartmentsService {
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/departments';
    this.departments = [];
  }

  /**
   * Requests the backend for a list of all departments
   */
  getDepartments() {
    return this.$http.get(this.baseDomain + this.resource)
      .then((response) => {
        this.departments = response.data;
        return this.departments;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }
}
