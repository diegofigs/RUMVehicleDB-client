/**
 * AuthService is in charge of enforcing security
 * measures in the core application layer.
 */
export default class AuthService {
  /**
   * Constructs a new instance of AuthService and initializes it.
   * @param $http
   * @param $log
   * @param $sessionStorage
   */
  constructor($http, $log, $sessionStorage) {
    this.$http = $http;
    this.$log = $log;
    this.$sessionStorage = $sessionStorage;

    if(this.$sessionStorage.token){
      this.$http.defaults.headers.common.Authorization = 'Bearer ' + this.$sessionStorage.token;
      this.$sessionStorage.user = {};
    }
    else {
      this.$http.defaults.headers.common.Authorization = 'Basic';
    }

    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
  }

  /**
   * Authenticates a user with credentials and
   * returns its details.
   * @param {Object} user user credentials
   * @return {Promise<Object>}
   */
  authenticate(user) {
    return this.$http.post(this.baseDomain + '/auth', user)
      .then((response) => {
        this.$sessionStorage.token = response.data.token;
        this.$http.defaults.headers.common.Authorization = 'Bearer ' + this.$sessionStorage.token;
          return this.currentUser();
      });
  }


  /**
   * Provides all user object details of current logged in user.
   * @return {Promise<Object>}
   */
  currentUser() {
    return this.$http.get(this.baseDomain + '/auth/me')
      .then((response) => {
        this.$sessionStorage.user = response.data.data;
        return this.$sessionStorage.user;
      });
  }

  /**
   * Logs user out and removes all credentials from service scope.
   */
  logOut() {
    this.$http.defaults.headers.common.Authorization = 'Basic';
    delete this.$sessionStorage.token;
    delete this.$sessionStorage.user;
  }

  /**
   * Get current token property.
   * @return {Object|null}
   */
  getToken() {
    if (this.isLoggedIn()) {
      return this.$sessionStorage.token;
    }

    return null;
  }

  /**
   * Get current user property.
   * @return {Object|null}
   */
  getUser() {
    if (this.isLoggedIn()) {
      return this.$sessionStorage.user;
    }

    return null;
  }

  /**
   * Checks for token existence.
   * @return {boolean}
   * @private
   */
  isLoggedIn() {
    return !!this.$sessionStorage.token;
  }
}
