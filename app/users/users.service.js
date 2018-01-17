
/**
 * Users Service is in charge of API calls (GET, POST, PUT, DELETE)
 * related to Users
 */

export default class UsersService {
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
   * Requests the backend for a list of all system users (Admins, Custodians, and Vehicle Managers)
   */
  getUsers(params = {}) {
    return this.$http.get(this.API + this.resource, {
      params: params
    }).then((response) => {
        this.users = response.data.data[0].data;
        this.pageSize = response.data.data[0].per_page;
        this.total = response.data.data[0].total;
        return this.users;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  /**
   * Requests the backend for a specific user
   * @param id User ID
   */
  getUser(id) {
    return this.$http.get(this.API + this.resource + id)
      .then((response) => {
        this.user = response.data.data;
        return this.user;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  /**
   * Requests the backend to create a new system user
   * @param user User to be created
   */
  createUser(user) {
    return this.$http.post(this.API + this.resource, user);
  }

  /**
   * Requests the backend to delete a user
   * @param user user to be deleted
   * @returns {*} Server response
   */
  deleteUser(user) {
    user.user_type_id = 4;  //4 is for Inactive
    return this.$http.put(this.API + this.resource + user.id, user);
  }

  /**
   * Requests the backend to modify an existing user
   * @param user User to be modified
   * @returns {Promise<Object>} Server response
   */
  editUser(user) {
    return this.$http.put(this.API + this.resource + user.id, user)
      .catch((error) => {
        this.$log.log(error);
      });
  }

  getUserTypes() {
    return this.$http.get(this.API +'/api/v1/user-types')
      .then((response) => {
        this.userTypes = response.data;
        return this.userTypes;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }

  getNonPaginatedUsers() {
    return this.$http.get(this.API + '/api/v1/custodians-list')
      .then((response) => {
        this.nonPaginatedUsers = response.data;
        return this.nonPaginatedUsers;
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }
}
