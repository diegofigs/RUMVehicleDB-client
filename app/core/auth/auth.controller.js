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
  constructor ($state, $log, AuthService) {
    // angular injected services
    this.$state = $state;
    this.$log = $log;
    this.authService = AuthService;

    // Temporary user object for form
    this.user = {};
  }

  /**
   * Login function that calls AuthService with user credentials.
   * @return {Promise<Object>}
   */
  login() {
    return this.authService.authenticate(this.user)
      .then(() => {
        this.user = {};
        this.$state.go('dashboard.home');
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }
}
