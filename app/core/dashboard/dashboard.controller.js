import 'perfect-scrollbar/jquery';

/**
 * DashboardController is in charge of handling state changes
 * emitted from sidebar and be a container for other modules' views.
 */
export default class DashboardController {
  /**
   * Constructs a new instance of DashboardController
   * and initializes it.
   * @param $rootScope
   * @param $state
   * @param $translate
   * @param $timeout
   * @param $window
   * @param AuthService
   */
  constructor($rootScope,
              $state,
              $translate,
              $timeout,
              $window,
              AuthService) {
    // angular injected services
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.$translate = $translate;
    this.$window = $window;
    this.authService = AuthService;

    this.bodySelector = 'body';

    if ($(window).width() < 1450) {
      $('.c-hamburger').removeClass('is-active');
      $(this.bodySelector).removeClass('extended');
    }

    this.$rootScope.$on('$stateChangeSuccess', () => {
      this.$timeout(() => {
        $(this.bodySelector).scrollTop(0);
      }, 200);
    });

    if ($(this.bodySelector).hasClass('extended')) {
      this.$timeout(function() {
        $('.sidebar').perfectScrollbar();
      }, 200);
    }

    let w = angular.element(this.$window);

    w.bind('resize', () => {
      if ($(window).width() < 1200) {
        $('.c-hamburger').removeClass('is-active');
        $(this.bodySelector).removeClass('extended');
      }
      if ($(window).width() > 1600) {
        $('.c-hamburger').addClass('is-active');
        $(this.bodySelector).addClass('extended');
      }
    });

    if ($(window).width() < 1200) {
      this.$rootScope.$on('$stateChangeSuccess', () => {
        $('.c-hamburger').removeClass('is-active');
        $(this.bodySelector).removeClass('extended');
      });
    }

    if ($(window).width() < 600) {
      this.$rootScope.$on('$stateChangeSuccess', () => {
        $('.mdl-grid').removeAttr('dragula');
      });
    }
  }

  // Deprecated
  // subnav(x) {
  //   if (x === $scope.showingSubNav) {
  //     $scope.showingSubNav = 0;
  //   } else {
  //     $scope.showingSubNav = x;
  //   }
  //   return false;
  // }

  // Deprecated
  // rtl() {
  //   $(this.bodySelector).toggleClass('rtl');
  // }

  /**
   * Changes language used inside application.
   * @param {string} l regional code
   */
  changeLanguage(l) {
    this.$translate.use(l);
  }

  /**
   * Trigger function for extending sidebar.
   */
  extend() {
    $('.c-hamburger').toggleClass('is-active');
    $(this.bodySelector).toggleClass('extended');
    $('.sidebar').toggleClass('ps-container');
    this.$rootScope.$broadcast('resize');
    this.$timeout(() => {
      $('.sidebar').perfectScrollbar();
      console.log('pfscroll');
    }, 200);
  }

  // Deprecated
  // changeTheme(setTheme) {
  //   $('<link>').appendTo('head')
  //     .attr({type : 'text/css', rel : 'stylesheet'})
  //     .attr('href', 'styles/app-' + setTheme + '.css');
  // }

  /**
   * Wrapper function for accessing user details
   * in scope.
   * @return {Object|null}
   */
  getUser() {
    return this.authService.getUser();
  }

  /**
   * Wrapper function for logging user out.
   */
  logOut() {
    this.authService.logOut();
    this.$state.go('login');
  }
}
