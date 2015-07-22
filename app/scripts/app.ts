/// <reference path='..\libs\angular\angular.d.ts' />
/// <reference path='..\libs\jquery\jquery.d.ts' />
/// <reference path='..\libs\angular\angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />
/// <reference path='components/dashboard/dashboardController.ts' />


 // http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory
angular.module('app', ['app.controllers', 'ngRoute','ngStorage', 'ngResource'])

.config(function ($routeProvider, $httpProvider) {

    "use strict"; // do I need this?

    $routeProvider
      .when('/home', {
        templateUrl:    '/views/homeView.html',
        controller:     'Home.Controller',
        // Error: [$injector:unpr] Unknown provider: AccessProvider <- Access <- access
      })
      .when('/signup', {
        templateUrl:    '/views/signupView.html',
        controller:     'Signup.Controller',
        resolve: {
          /*access: ["Access", function(Access) { return Access.isAnonymous(); }],*/
        }
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
      .otherwise( {
        redirectTo:     '/home',
        controller:     'Home.Controller',
      });
})

/*
Try and create authenticationService to do all the work,
I think that Service needs to be added to this file. If I can
off load the work into one serve class that would be best
AuthTemp is all functions. It may be easier to use authTemp and jsut have that
class take a promise and return a promise called Access in order to pass into app.ts

Access in the .run is called from this factory("Access") ... So in order to do what is abouve
I need to make sure I can call authenticationService and pass it into run
That should do the trick :)
*/

// User is a standard AngularJS resource with a profile method (needs angular-resource):
.factory("Access", ["$q", "$resource", '$location', function($q, $resource, $location) {
  // return AuthenticationService.Access.Factory($q, UserProfile);
  var Access = {
    isAuthenticated: () => {
      var p = $q.defer();
      $location.path('/home');
      // If authenticated
      /*p.resolve();*/
      /*p.reject("reason");*/
      return p.promise;
    }
  };
  return Access;
}]);

module app {
    export var controllers = angular.module('app.controllers',[]);
}
