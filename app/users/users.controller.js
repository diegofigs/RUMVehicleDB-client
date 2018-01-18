
/**
 * Users Controller is in charge of all business logic related to System Users
 * The system has 4 different type of users: Admin, Vehicle Admin, Custodian, Auxiliary Custodian
 */
export default class UsersController {
  constructor($state, $log, UsersService, DepartmentsService, swal) {
    this.$state = $state;
    this.$log = $log;
    this.usersService = UsersService;

    this.users = this.usersService.users;
    this.user = this.usersService.user;
    this.userTypes = this.usersService.userTypes;
    this.newUser = {};
    this.departments = DepartmentsService.departments;

    this.swal = swal;

    this.filter = {
      department_id: '',
      user_type_id: '',
    };

    this.isActive = {
      is_active: '1',
    };

    this.pageQuery = {
      page: this.usersService.page,
      is_active: '1',
    };


    this.pagination = {
      boundaryLinks: true,
      limit: this.usersService.pageSize,
      total: this.usersService.total,
    };

    this.getPaginatedUsers = this.getPaginatedUsers.bind(this);

  }

  /**
   * If user creation is successful, shows user success feedback
   * If user creation is unsuccessful, shows user error feedback
   */
  confirmUserCreation(){

      this.createUser()
        .then(() => {
          this.swal({
            title: 'User was successfully created!',
            type: 'success'
          });
        })
        .catch((error) => {

          if(error.data !== null && error.data.message === 'duplicated_email'){
            this.swal({
              title: 'The email: ' + this.newUser.email + ' already exists in the system',
              type: 'error'
            });
          }
          else {
            this.swal({
              title: 'Error: User could not be created',
              type: 'error'
            });
          }
        });
  }

  /**
   * Sends user to be created to the Users Service
   */
  createUser() {
    return this.usersService.createUser(this.newUser)
      .then(() => {
      this.$state.go('dashboard.users.list');
    });
  }

  /**
   * If card user is successful, shows user success feedback
   * If user deletion is unsuccessful, shows user error feedback
   * @param user User to be deleted
   */
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

        })
        .catch((error) => {
          this.swal({
            title: 'Error: User could not be deleted',
            type: 'error'
          });
        });
    });
  }

  /**
   * Sends user to be deleted to the Users Service
   */
  deleteUser(user){
    return this.usersService.deleteUser(user)
      .then(() => {
      this.$state.go('dashboard.users.list');
      this.$state.reload();
    });
  }

  /**
   * If user edition is successful, shows user success feedback
   * If user edition is unsuccessful, shows user error feedback
   */
  confirmUserEdition(){

    this.editUser()
      .then(() => {
        this.swal({
          title: 'User was successfully edited!',
          type: 'success'
        });
      })
      .catch((error) => {
        this.swal({
          title: 'Error: User could not be edited',
          type: 'error'
        });
      });
  }

  /**
   * Sends user to be edited to the Card Service
   */
  editUser(){
    return this.usersService.editUser(this.user).then(() => {
      this.$state.go('dashboard.users.list');
    });
  }

  getPaginatedUsers(){
    return this.usersService.getUsers(this.pageQuery)
      .then( () => {
        this.users = this.usersService.users;
      });
  }

  /**
   * Requests Users Service a list of users with filter parameters applied
   */
  applyUsersFilter() {
    return this.usersService.getUsers(this.filter)
      .then( () => {
        this.pagination.limit = this.usersService.pageSize;
        this.pagination.total = this.usersService.total;
        this.users = this.usersService.users;
      });
  }

  /**
   * Reloads view in order to reset/clear filter parameters
   */
  reload(){
    this.$state.reload();
  }
}
