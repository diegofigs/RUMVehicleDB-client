/**
 * Users Controller is in charge of presentation and validation logic
 * for user related states and interactions.
 */
export default class UsersController {
  /**
   * Constructs a new instance of UsersController and initializes it.
   * @param $state
   * @param $log
   * @param UsersService
   * @param DepartmentsService
   * @param swal
   */
  constructor($state, $log, UsersService, DepartmentsService, swal) {
    this.$state = $state;
    this.$log = $log;
    this.usersService = UsersService;
    this.swal = swal;


    this.users = this.usersService.users;
    this.user = this.usersService.user;
    this.userTypes = this.usersService.userTypes;
    this.newUser = {};
    this.departments = DepartmentsService.departments;


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
   * Requests user creation to service, providing the
   * User object.
   * @return {Promise<Object>}
   */
  createUser() {
    return this.usersService.createUser(this.newUser)
      .then(() => {
      this.$state.go('dashboard.users.list');
    });
  }

  /**
   * Asks for user confirmation before actually processing deletion.
   * @param {Object} user User to be deleted
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
   * Requests card deletion to service, providing
   * desired User object.
   * @return {Promise<Object>}
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
   * Requests user modification to service, providing
   * modified User object.
   * @return {Promise<Object>}
   */
  editUser(){
    return this.usersService.editUser(this.user).then(() => {
      this.$state.go('dashboard.users.list');
    });
  }

  /**
   * Requests users to service with page object provided.
   * @return {Promise<Object>}
   */
  getPaginatedUsers(){
    return this.usersService.getUsers(this.pageQuery)
      .then( () => {
        this.users = this.usersService.users;
      });
  }

  /**
   * Requests cards to service with filter object provided,
   * synchronizes pagination metadata on success.
   * @return {Promise<Object>}
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
