angular.module('MyApp', ['ngAnimate','ngRoute'])
  .controller('LandingController', ['$scope', function ($scope) {

  }])
  .controller('RegisterController', ['$scope', function ($scope) {

  }])
  .config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/landing.html',
        controller: 'LandingController'
      })
      .when('/register', {
        templateUrl: '/partials/register.html',
        controller: 'RegisterController'
      })
      .when('/page-not-found', {
        templateUrl: '/partials/error.html'
      })
      .otherwise({
        redirectTo: '/page-not-found'
      });
    $locationProvider.html5Mode(true);
  }]);
  