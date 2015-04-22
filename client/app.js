'use strict';

angular.module('zenNotez', [
  'ngRoute',
  'zenNotez.main',
  'zenNotez.lastRepeat',
  'zenNotez.edit',
  'zenNotez.viewPost'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/index', {
      templateUrl: 'client/templates/main.html',
    })
    .when('/edit', {
      templateUrl: 'client/templates/edit.html',
      controller: 'EditCtrl as edit',
    })
    .when('/edit/clear', {
      redirectTo: '/edit'
    })
    .when('/view/:id', {
      templateUrl: 'client/templates/viewPost.html',
      controller: 'ViewPostCtrl as view',
    })
    .otherwise({ redirectTo: '/index' });
}]);