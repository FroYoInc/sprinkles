/// <reference path='..\libs\angular\angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />
/// <reference path='components/dashboard/dashboardController.ts' />


angular.module('app', ['app.controllers','ngRoute','ngStorage','ui.bootstrap']).
  config(function ($routeProvider, $locationProvider, $httpProvider) {

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
    $routeProvider.when('/dashboard',
    {
      templateUrl:    '/views/dashboardView.html',
      controller:      'Dashboard.Controller'
      });
    $routeProvider.when('/carpool/create',
    {
      templateUrl:    '/views/carpoolCreateView.html',
      controller:      'Carpool.Create.Controller'
      });
    $routeProvider.otherwise(
    {
      redirectTo:     '/home',
      controller:     'Home.Controller',
    });
})
.config(function ($routeProvider, $locationProvider, $httpProvider) {

    "use strict"; // do I need this?

    $routeProvider
      .when('/home', {
        templateUrl:    '\\views\\homeView.html',
        controller:     'Home.Controller',
        // Error: [$injector:unpr] Unknown provider: AccessProvider <- Access <- access
        resolve: {
          access: ["Access", (Access) => {
            console.log(Access);
          }]
        }
      })
      .when('/signup', {
        templateUrl:    '\\views\\signupView.html',
        controller:     'Signup.Controller',
        resolve: {
          access: ["Access", function(Access) { return Access.isAnonymous(); }],
        }
      })
      .when('/dashboard', {
        templateUrl:    '\\views\\dashboardView.html',
        controller:      'Dashboard.Controller',
        resolve: {
          access: ["Access", function(Access) { return Access.isAuthenticated(); }]
          // ["Access", (Access) => { return Access.isAuthenticated();}]
        }
      })
      .otherwise( {
        redirectTo:     '/home',
        controller:     'Home.Controller',
      });
})

// User is a standard AngularJS resource with a profile method (needs angular-resource):
.factory("User", ["$resource", function($resource) {
  // return AuthenticationService.User.Factory($resource);
  this.user = $resource("rest/users/:id/:attr", { id: "@id" }, {

          profile: {
            method: "GET",
            params: { attr: "profile" }
          }
        });
      return this.user;
}])
// UserProfile encapsulates the current user to implement the
// isAnonymous and isAuthenticated methods logic:
.factory("UserProfile", ["$q", "User", function($q, User) {
    // return AuthenticationService.UserProfile.Factory($q, User);
    var deferred = $q.defer();

      console.log("in UserProfile");
        User.profile(function(userProfile) {
          console.log("Starting resolve from UserProfile");
          deferred.resolve({
            isAnonymous: function() {
              console.log("anonymous from userProfile");
              return userProfile.anonymous;
            },

            isAuthenticated: function() {
              console.log("Authenticated from userProfile");
              return !userProfile.anonymous;
            }

          });
        });
        console.log("returning from userProfile");
        return deferred.promise;
}])
.factory("Access", ["$q", "UserProfile", function($q, UserProfile) {
  // return AuthenticationService.Access.Factory($q, UserProfile);
  var Access = {

        OK: 200,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,

        isAnonymous: function() {
        console.log("Passed in promise is" + $q);
          var deferred = $q.defer();
          console.log("Starting promise from isAnonymous");
          console.log("deferred is " + deferred);
          UserProfile.then(function(userProfile) {
            if (userProfile.isAnonymous()) {
              deferred.resolve(Access.OK);
              console.log("Access OK from isAnonymous");
            } else {
              deferred.reject(Access.FORBIDDEN);
              console.log("Access FORBIDDEN from isAnonymous");
            }
          });
          return deferred.promise;
        },

        //so far what it prints out when a use trys to log in and it is succesful is
        //Starting promise from isAuthenticated
        //deferred is [object Object]
        //meaning that the promise isn't getting passed in correctly
        isAuthenticated: function() {
          var deferred = $q.defer();
          console.log("Starting promise from isAuthenticated");
          console.log("deferred is " + deferred);
          UserProfile.then(function(userProfile) {
            if (userProfile.isAuthenticated()) {
              deferred.resolve(Access.OK);
              console.log("Access OK from isAuthenticated");
            } else {
              deferred.reject(Access.UNAUTHORIZED);
              console.log("Access UNAUTHORIZED from isAuthenticated");
            }
          });
          return deferred.promise;
        }

      };
      console.log("returning access");
      return Access;
}])

// when Access rejects a promise, the $routeChangeError event will be fired:
.run(["$rootScope", "Access", "$location",
function($rootScope, Access, $location) {

  $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
    console.log("routeChangeError is triggered");
    if (rejection == Access.UNAUTHORIZED) {
      console.log("rejection == Access.UNAUTHORIZED");
      $location.path("/home");
    } else if (rejection == Access.FORBIDDEN) {
      console.log("rejection == Access.FORBIDDEN");
      $location.path("/home");
    }
  });

}]);

module app {
    export var controllers = angular.module('app.controllers',[]);
}
