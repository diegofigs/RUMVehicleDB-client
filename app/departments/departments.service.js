/**
 * Created by diegofigs on 3/5/17.
 */

export default class DepartmentsService {
  constructor($http, $log, AuthService) {
    this.$http = $http;
    this.$log = $log;
    this.authService = AuthService;
    this.baseDomain = 'http://67.205.175.113/api/v1';
    this.resource = '/departments';
    this.departments = [];
  }

  getDepartments() {
    return this.$http.get(this.baseDomain + this.resource, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).then((response) => {
      this.departments = response.data;
      return this.departments;
    })
      .catch((error) => {
        this.$log.log(error);
      });
  }
}
