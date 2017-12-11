


class fileModel {

  constructor($parse) {
    this.link = this.linkFunc;
    this.restrict = 'A';
  }

  linkFunc(scope, element, attrs) {
    let model = $parse(attrs.fileModel);
    let modelSetter = model.assign;

    element.bind('change', function(){
      scope.$apply(function(){
        modelSetter(scope, element[0].files[0]);
      });
    });
  }
}


var myApp = angular.module('myApp', []);

myApp.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);
