export default class AuthController {
  /** @ngInject */
  constructor ($state, $log, AuthService) {
    this.$state = $state;
    this.$log = $log;
    this.authService = AuthService;

    this.user = {};
  }

  login() {
    return this.authService.authenticate(this.user)
      .then(() => {
        this.user = {};
        this.$state.go('dashboard');
      })
      .catch((error) => {
        this.$log.log(error);
      });
  }
}
