angular.module('MyApp', ['ngAnimate', 'ngRoute'])
    .controller('LandingController', ['$scope', function ($scope) {

    }])
    .controller('RegisterController', ['$scope','$http', '$location', function ($scope, $http, $location) {
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
            $scope.user = {};
            $location.url('/dashboard');
        }
        
        // $http.get('http://avid-api.cfapps.io/guardians').then(function(response){
        //     console.log(response.data);
        // })
    }])
    .controller('TrackerController', ['$scope','$routeParams', function ($scope, $routeParams) {
        //http get to interests with id
        console.log($routeParams.id)
    }])
    .controller('DashboardController', ['$scope','$http', function ($scope, $http) {
        $scope.kids = [];
        var guardianId = localStorage.getItem('id');
        $http.get('http://avid-api.cfapps.io/relationships/'+guardianId).then(function(response){
            // console.log(response    )
            // for (var x in response.data.rows) {
            //     $http.get('http://avid-api.cfapps.io/kids/'+response.data.rows[x].kid_id).then(function(response){
            //         console.log(response.data.rows)
            //         $scope.kids.push(response.data.rows[0])
            //         console.log($scope.kids);
            //     })
        
            // }

        })
        
        $scope.addKid = function(kid) {
            $http.post('http://avid-api.cfapps.io/kids',
                {
                  "data": {
                    "type": "kid",
                    "attributes": {
                      "name": kid.name,
                      "gender": kid.gender,
                      "age": kid.age
                    }
                  }
                }).then(function(response){
                    var kidId = response.data.rows[0].id;
                    $http.post('http://avid-api.cfapps.io/relationships',
                        {
                            "data": {
                                "type": "relationship",
                                "attributes": {
                                  "guardian_id": guardianId,
                                  "kid_id": kidId
                                }
                            }
                        }
                    ).then(function(response) {
                        console.log(response);
                    });

            // ).then(function(response){
            //     console.log('hi')
            //     var kidId = response.data.rows[0].id;
            //     console.log(kidId);
                // $http.post('http://avid-api.cfapps.io/relationships',
                //     {
                //       "data": {
                //         "type": "relationship",
                //         "attributes": {
                //           "guardian_id": guardianId,
                //           "kid_id": kidId
                //         }
                //     }
                // }
            //     ).then(function(response) {
            //         console.log(response.data);
            //     })
            // });
            $scope.kids.push($scope.kid);
            $scope.kid = {};
            $scope.showForm = false;
        }

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
            // .when('/tracker', {
            //   templateUrl: '/partials/tracker.html',
            //   controller: 'TrackerController'
            // })
            .when('/tracker/:id', {
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
  