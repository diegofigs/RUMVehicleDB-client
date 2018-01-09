
/**
 * Users Service is in charge of API calls (GET, POST, PUT, DELETE)
 * related to Users
 */

export default class UsersService {
  constructor($http, $log) {
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/custodians';
    this.$http = $http;
    this.$log = $log;

    this.user = {};
    this.users = [];
  }

  /**
   * Requests the backend for a list of all system users (Admins, Custodians, and Vehicle Managers)
   */
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

  /**
   * Requests the backend for a specific user
   * @param id User ID
   */
  getUser(id) {
    return this.$http.get(this.baseDomain + this.resource + '/' + id)
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
    return this.$http.post(this.baseDomain + this.resource, user)
  }

  /**
   * Requests the backend to delete a user
   * @param user user to be deleted
   * @returns {*} Server response
   */
  deleteUser(user) {
    return this.$http.delete(this.baseDomain + this.resource + '/' + user.id)
  }

  /**
   * Requests the backend to modify an existing user
   * @param user User to be modified
   * @returns {FinishedRequest<T>} Server response
   */
  editUser(user) {
    return this.$http.put(this.baseDomain + this.resource + '/' + user.id, user)
  }
}
