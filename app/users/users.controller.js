/**
 * Created by diegofigs on 1/31/17.
 */

export default class UsersController {
  constructor($state, $log, UsersService, DepartmentsService, swal) {
    this.$state = $state;
    this.$log = $log;
    this.usersService = UsersService;

    this.users = this.usersService.users;
    this.user = this.usersService.user;
    this.newUser = {};
    this.departments = DepartmentsService.departments;

    this.swal = swal;
  }

  createUser() {
    return this.usersService.createUser(this.newUser)
      .then(() => {
      this.$state.go('dashboard.users.list');
    });
  }

  confirmUserDeletion(user){

    this.swal({
      title: 'Do you really want to delete this user?',
      type: 'warning',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#4caf50',
      showCancelButton: 'true',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#f44336',
    }).then(() => {

      this.deleteUser(user)
        .then(() => {

          this.swal({
            title: 'User has been deleted',
            type: 'success'
          });

          this.$state.reload();
        })
        .catch((error) => {
          this.swal({
            title: 'Error: User could not be deleted',
            type: 'error'
          });
        });
    });
  }

  deleteUser(user) {
    return this.usersService.deleteUser(user).then(() => {
      this.$state.reload();
    });
  }

  editUser() {
    return this.usersService.editUser(this.user).then(() => {
      this.$state.go('dashboard.users.list');
    });
  }
}
