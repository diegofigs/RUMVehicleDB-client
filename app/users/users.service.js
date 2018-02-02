/**
 * Users Service is in charge of emitting http requests to the API
 * related to user information.
 */
export default class UsersService {
  /**
   * Constructs a new instance of UsersService and initializes it.
   * @param $http
   * @param $log
   * @param API
   */
  constructor($http, $log, API) {
    this.$http = $http;
    this.$log = $log;
    this.API = API;
    this.resource = '/api/v1/custodians/';

    this.user = {};
    this.users = [];
    this.nonPaginatedUsers = [];
    this.userTypes = [];

    // Initialize pagination metadata
    this.total = 1;
    this.page = 1;
    this.pageSize = 10;
  }

  /**
   * Requests users to the API, filtering results if params provided.
   * @param {Object} params Object where each key and value is used
   * for filtering requested User objects
   * @return {Promise<Object>}
   */
  getUsers(params) {
    return this.$http.get(this.API + this.resource, {
      params: params
    }).then((response) => {
        this.users = response.data.data[0].data;
        this.pageSize = response.data.data[0].per_page;
        this.total = response.data.data[0].total;
        return this.users;
      });
  }

  /**
   * Requests a single user to the API.
   * @param {number} id Numerical value provided by the API
   * @return {Promise<Object>}
   */
  getUser(id) {
    return this.$http.get(this.API + this.resource + id)
      .then((response) => {
        this.user = response.data.data;
        return this.user;
      });
  }

  /**
   * Requests the creation of a new User object to the API.
   * @param {Object} user User for creation
   * @return {Promise<Object>}
   */
  createUser(user) {
    return this.$http.post(this.API + this.resource, user);
  }

  /**
   * Requests the deletion of a single existing User object to the API.
   * @param {Object} user User for deletion
   * @returns {Promise<Object>}
   */
  deleteUser(user) {
    user.user_type_id = 4;  //4 is for Inactive
    return this.$http.put(this.API + this.resource + user.id, user);
  }

  /**
   * Requests the modification of a single existing
   * User object to the API.
   * @param {Object} user User for modification
   * @returns {Promise<Object>}
   */
  editUser(user) {
    return this.$http.put(this.API + this.resource + user.id, user);
  }

  /**
   * Requests user types to the API, in a list sorted by name.
   * @return {Promise<Object[]>}
   */
  getUserTypes() {
    return this.$http.get(this.API +'/api/v1/user-types')
      .then((response) => {
        this.userTypes = response.data;
        return this.userTypes;
      });
  }

  /**
   * Requests users to the API, in a list sorted by name.
   * @return {Promise<Object[]>}
   */
  getNonPaginatedUsers() {
    return this.$http.get(this.API + '/api/v1/custodians-list')
      .then((response) => {
        this.nonPaginatedUsers = response.data;
        return this.nonPaginatedUsers;
      });
  }
}
