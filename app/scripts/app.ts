/// <reference path='..\libs\angular\angular.d.ts' />
/// <reference path='..\libs\jquery\jquery.d.ts' />
/// <reference path='..\libs\angular\angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />
/// <reference path='components/dashboard/dashboardController.ts' />
/// <reference path='components/carpools/editCarpoolController.ts' />

angular.module('app', ['app.controllers', 'ngRoute','ngStorage', 'ngResource', 'ngCookies'])

.config(function ($routeProvider, $httpProvider, $cookiesProvider) {

    "use strict"; // do I need this?

    $routeProvider
      .when('/home', {
        templateUrl:    '/views/homeView.html',
        controller:     'Home.Controller',
      })
      .when('/signup', {
        templateUrl:    '/views/signupView.html',
        controller:     'Signup.Controller',
      })
      .when('/dashboard', {
        templateUrl:    '/views/dashboardView.html',
        controller:      'Dashboard.Controller',
        resolve: {
          access: ["Access", (Access) => {
             var a =  Access.isAuthenticated();
             return a;
          }]
        },
      })
      .when('/dashboard/carpools/edit', {
        templateUrl:    '/views/editCarpoolView.html',
        controller:      'Dashboard_Carpools_Edit.Controller',
        resolve: {
          access: ["Access", (Access) => {
             var a =  Access.isAuthenticated();
             return a;
          }]
        },
      })

      .otherwise( {
        redirectTo:     '/home',
        controller:     'Home.Controller',
      });
})

// User is a standard AngularJS resource with a profile method (needs angular-resource):
.factory("Access", ["$q", "$resource", '$location', '$cookies',
          function($q, $resource, $location, $cookies) {
  // return AuthenticationService.Access.Factory($q, UserProfile);


  var Access = {
      OK: 200,
      UNAUTHORIZED: 401,

    isAuthenticated: () => {
      var p = $q.defer();
      var cookie = $cookies.getObject('isAuth');
      if (cookie == true){
          p.resolve(Access.OK);
      } else {
        p.reject(Access.UNAUTHORIZED);
      }
      return p.promise;
    }
  };
  return Access;
}])
// when Access rejects a promise, the $routeChangeError event will be fired:
.run(["$rootScope", "Access", "$location",
function($rootScope, Access, $location) {

  $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
    if (rejection == Access.UNAUTHORIZED) {
      $location.path("/home");
    } 
  });

}]);
module app {
    export var controllers = angular.module('app.controllers',[]);
}

