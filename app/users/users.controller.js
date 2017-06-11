/**
 * Created by diegofigs on 1/31/17.
 */

export default class UsersController {
  /** @ngInject */
  constructor($state, $log, UsersService) {
    this.$state = $state;
    this.$log = $log;
    this.usersService = UsersService;

    this.users = this.usersService.users;
  }

  createUser() {
    return this.usersService.createUser(this.user)
      .then(() => {
      this.$state.go('dashboard.users.list');
    });
  }

  deleteUser(user) {
    return this.usersService.deleteUser(user).then(() => {
      this.$state.reload();
    });
  }

  editUser(user) {
    return this.usersService.editUser(user).then(() => {
      this.$state.go('dashboard.users.list');
    });
  }
}
