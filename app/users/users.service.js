/**
 * Created by diegofigs on 1/31/17.
 */
export default class UsersService {
  /** @ngInject */
  constructor($http, $log, AuthService) {
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/custodians';
    this.$http = $http;
    this.$log = $log;
    this.authService = AuthService;

    this.user = {};
    this.users = [];
  }

  getUsers() {
    return this.$http.get(this.baseDomain + this.resource)
      .then((response) => {
        this.users = response.data.data[0].data;
        return this.users;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  createUser(user) {
    return this.$http.post(this.baseDomain + this.resource, user)
      .catch((error) => {
        this.$log.log(error);
      });
  }

  deleteUser(user) {
    return this.$http.delete(this.baseDomain + this.resource + '/' + user.id)
      .catch((error) => {
        this.$log.log(error);
      });
  }

  editUser(user) {
    return this.http.put(this.baseDomain + this.resource + '/' + user.id, user)
      .catch((error) => {
        this.$log.log(error);
      });
  }
}
