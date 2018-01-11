/**
 * AuthController is in charge of handling user input at the
 * login portal.
 */
export default class AuthController {
  /**
   * Constructs a new instance of AuthController and initializes it.
   * @param $state
   * @param $log
   * @param AuthService
   */
  constructor ($state, $log, AuthService, swal) {
    // angular injected services
    this.$state = $state;
    this.$log = $log;
    this.authService = AuthService;
    this.swal = swal;

    // Temporary user object for form
    this.user = {};
  }

  /**
   * Login function that calls AuthService with user credentials.
   * @return {Promise<Object>}
   */
  login() {
    return this.authService.authenticate(this.user)
      .then((user) => {
        this.user = {};
        if(user.user_type_name === 'vehicle_admin'){
          this.$state.go('dashboard.vehicles.list');
        }
        else{
          this.$state.go('dashboard.home');
        }
      })
      .catch((error) => {
        this.$log.log(error);
        this.swal({
          title: 'Error',
          text: 'Invalid credentials. Please, enter a valid email and password.',
          type: 'error',
        });
        // if(error === null){
        //   this.swal({
        //     title: 'Error',
        //     text: 'Something went wrong! Please try again later.',
        //     type: 'error',
        //   });
        // }
        // else if(error !== null && error.data.error === 'invalid_credentials'){
        //   this.swal({
        //     title: 'Error',
        //     text: 'Invalid credentials. Please, enter a valid email and password.',
        //     type: 'error',
        //   });
        // }
        // else {
        //   this.swal({
        //     title: 'Error',
        //     text: 'Something went wrong! Please try again later.',
        //     type: 'error',
        //   });
        // }
      });
  }

  showForgotPasswordDialog(){
    this.swal({
      title: 'Forgot Password?',
      type: 'info',
      text: 'Please contact RUM Vehicle\'s administrator, Jeannette Muñiz Vargas, at (787) 832-4040 Ext. XXX in order to ' +
      'reset your password. '
    });

  }
}
