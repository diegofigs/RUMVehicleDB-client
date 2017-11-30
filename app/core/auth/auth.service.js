/**
 * Created by diegofigs on 1/30/17.
 */
export default class AuthService {
  /** @ngInject */
  constructor($http, $log, $sessionStorage) {
    this.$http = $http;
    this.$log = $log;
    this.$sessionStorage = $sessionStorage;
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
  }

  authenticate(user) {
    this.$log.log(user);
    return this.$http.post(this.baseDomain + '/auth', user)
      .then((response) => {
        this.$log.log(response);
        this.$sessionStorage.token = response.data.token;
        return this.$http.get(this.baseDomain + '/auth/me', {
          headers: {
            Authorization: 'Bearer ' + this.$sessionStorage.token,
          },
        }).then((response) => {
          this.$log.log(response);
          this.$sessionStorage.user = response.data.data;
          return this.$sessionStorage.user;
        });
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  logOut() {
    delete this.$sessionStorage.token;
    delete this.$sessionStorage.user;
  }

  getToken() {
    if (this.isLoggedIn()) {
      return this.$sessionStorage.token;
    }

    return null;
  }

  getUser() {
    if (this.isLoggedIn()) {
      return this.$sessionStorage.user;
    }

    return null;
  }

  isLoggedIn() {
    return !!this.$sessionStorage.token;
  }
}
