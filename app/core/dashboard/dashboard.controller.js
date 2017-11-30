/**
 * Created by diegofigs on 2/27/17.
 */
import 'perfect-scrollbar/jquery';

export default class DashboardController {
  /** @ngInject */
  constructor($rootScope,
              $state,
              $translate,
              $timeout,
              $window,
              AuthService) {
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

  subnav(x) {
    if (x === $scope.showingSubNav) {
      $scope.showingSubNav = 0;
    } else {
      $scope.showingSubNav = x;
    }
    return false;
  }

  rtl() {
    $(this.bodySelector).toggleClass('rtl');
  }

  changeLanguage(l) {

    this.$translate.use(l);

  }

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

  changeTheme(setTheme) {
    $('<link>').appendTo('head')
      .attr({type : 'text/css', rel : 'stylesheet'})
      .attr('href', 'styles/app-' + setTheme + '.css');
  }

  getUser() {
    return this.authService.getUser();
  }

  logOut() {
    this.authService.logOut();
    this.$state.go('login');
  }
}
