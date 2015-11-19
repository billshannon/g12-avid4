angular.module('MyApp', ['ngAnimate', 'ngRoute'])
    .controller('LandingController', ['$scope', function ($scope) {

    }])
    .controller('RegisterController', ['$scope','$http', function ($scope, $http) {
        $scope.register = function(user) {
            $http.post('http://avid-api.cfapps.io/guardians',
                {
                  "data": {
                    "type": "guardian",
                    "attributes": {
                      "name": user.name,
                      "email": user.email,
                      "password": user.password
                    }
                  }
                }
            ).then(function(response){
                localStorage.setItem('id', response.data.rows[0].id);
                console.log(response.data.rows[0].id);
            });
        }
        // $http.get('http://avid-api.cfapps.io/guardians').then(function(response){
        //     console.log(response.data);
        // })
    }])
    .controller('TrackerController', ['$scope', function ($scope) {

    }])
    .controller('DashboardController', ['$scope', function ($scope) {

    }])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/landing.html',
                controller: 'LandingController'
            })
            .when('/register', {
                templateUrl: '/partials/register.html',
                controller: 'RegisterController'
            })
            .when('/tracker', {
              templateUrl: '/partials/tracker.html',
              controller: 'TrackerController'
            })
            .when('/dashboard', {
              templateUrl: '/partials/dashboard.html',
              controller: 'DashboardController'
            })
            .when('/activities', {
                templateUrl: '/partials/activities.html',
                controller: 'ActivitiesController'
            })
            .when('/page-not-found', {
                templateUrl: '/partials/error.html'
            })
            .otherwise({
                redirectTo: '/page-not-found'
            });
        $locationProvider.html5Mode(true);
    }]);
  