/// <reference path='../../typings/angularjs/angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />
/// <reference path='components/dashboard/dashboardController.ts' />
/// <reference path='components/carpools/editCarpoolController.ts' />
/// <reference path='components/carpools/createCarpoolController.ts'/>
/// <reference path='components/carpools/viewCarpoolsController.ts'/>
/// <reference path='components/Request/responseController.ts'/>


angular.module('app', ['app.controllers','ngRoute','ngStorage','ui.bootstrap', 'ngResource', 'ngCookies']).
  config(function ($routeProvider, $locationProvider, $httpProvider, $cookiesProvider) {
    $routeProvider.when('/home',
    {
      templateUrl:    '/views/homeView.html',
      controller:     'Home.Controller'
    });
    $routeProvider.when('/signup',
    {
      templateUrl:    '/views/signupView.html',
      controller:     'Signup.Controller'
    });
    $routeProvider.when('/ApproveDeny', {
      templateUrl:    '/views/ApproveDenyView.html',
      controller:     'Response.Controller',
      resolve: {
        access: ["Access", (Access) => {
          var a =  Access.isAuthenticated();
          return a;
        }]
      }
    });
    $routeProvider.when('/dashboard',
    {
      templateUrl:    '/views/dashboardView.html',
      controller:      'Dashboard.Controller',
      resolve: {
          access: ["Access", (Access) => {
             var a =  Access.isAuthenticated();
             return a;
          }]
        }
      });
      $routeProvider.when('/dashboard/carpools/view',
      {
          templateUrl: '/views/displayCarpoolsView.html',
          controller: 'Dashboard_Carpools_View.Controller',
          resolve: {
              access: ["Access", (Access) => {
                 var a =  Access.isAuthenticated();
                 return a;
              }]
            }
      });
      $routeProvider.when('/dashboard/carpools/create',
      {
          templateUrl: '/views/createCarpoolView.html',
          controller: 'Dashboard_Carpools_Create.Controller',
          resolve: {
              access: ["Access", (Access) => {
                 var a =  Access.isAuthenticated();
                 return a;
              }]
            }
      });
      $routeProvider.when('/dashboard/carpools/edit',
      {

        templateUrl: '/views/editCarpoolView.html',
        controller: 'Dashboard_Carpools_Edit.Controller',
        resolve: {
          access: ["Access", (Access) => {
            var a =  Access.isAuthenticated();
            return a;
            }]
          }
      });

      $routeProvider.when('/dashboard/admin',
      {
        templateUrl: '/views/adminView.html',
        controller: 'Admin.Controller',
        resolve: {
          access: ["Access", (Access) => {
            var a =  Access.isAuthenticated();
            return a;
            }]
          }
      });
      $routeProvider.when('/dashboard/settings',{

        templateUrl: '/views/settingsView.html',
        controller: 'PasswordManager.Controller',
        resolve: {
          access: ["Access", (Access) => {
            var a =  Access.isAuthenticated();
            return a;
            }]
          }
      });

      $routeProvider.when('/password/reset', {

        templateUrl: '/views/resetPasswordView.html',
        controller: 'PasswordManager.Controller',
        resolve: {
          access: ["Access", (Access) => {
            var a =  Access.isAuthenticated();
            return a;
            }]
          }
      });

      $routeProvider.when('/invalidActivation', {
        templateUrl: '/views/invalidActivation.html',
      });

      $routeProvider.otherwise(
      {
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
      var cookie = $cookies.getObject('user');
      if (cookie.isAuth == true){
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
.run(["$rootScope", "Access", "$location", '$cookies',
function($rootScope, Access, $location, $cookies) {
  var cookie = $cookies.getObject('user');
  if (typeof(cookie) != "undefined") {
    if (cookie.isAuth == true) {
      $location.path("/dashboard");
    }
  }

  $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
    if (rejection == Access.UNAUTHORIZED) {
      $location.path("/home");
    }
  });

}])

// Gloabl variables
.factory('ConfigService', function() {
  return {
    host: "http://localhost:",
    port: "3000",
    mapsApi : 'https://maps.googleapis.com/maps/api/geocode/json?address=',
    key : "AIzaSyBSF13-LI-xt-UwQ4LOQ_OhM3V6mssNuNo"
  };
});

module app {
    export var controllers = angular.module('app.controllers',[]);
}
