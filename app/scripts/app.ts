/// <reference path='..\libs\angular\angular.d.ts' />
/// <reference path='..\libs\jquery\jquery.d.ts' />
/// <reference path='..\libs\angular\angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />
/// <reference path='components/dashboard/dashboardController.ts' />


 // http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory
angular.module('app', ['app.controllers','ngRoute','ngStorage', 'ngResource'])

.config(function ($routeProvider, $locationProvider, $httpProvider) {

    "use strict"; // do I need this?

    $routeProvider
      .when('/home', {
        templateUrl:    '\\views\\homeView.html',
        controller:     'Home.Controller',
        // Error: [$injector:unpr] Unknown provider: AccessProvider <- Access <- access
        resolve: {
          foo: ["Foo", (foo) => {
            foo.bar();
          }],
          access: ["Access", (Access) => {
            console.log(Access);
          }]
        }
      })
      .when('/signup', {
        templateUrl:    '\\views\\signupView.html',
        controller:     'Signup.Controller',
        resolve: {
          /*access: ["Access", function(Access) { return Access.isAnonymous(); }],*/
        }
      })
      .when('/dashboard', {
        templateUrl:    '\\views\\dashboardView.html',
        controller:      'Dashboard.Controller',
        resolve: {
          /*access: ["Access", function(Access) { return Access.isAuthenticated(); }],*/
        }
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

.factory("Foo", ["$q", ($q) => {
  var Foo =  {
    bar: () => {console.log("bar")}
  }
  return Foo;
}])
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

        User.profile(function(userProfile) {
          deferred.resolve({

            isAnonymous: function() {
              return userProfile.anonymous;
            },

            isAuthenticated: function() {
              return !userProfile.anonymous;
            }

          });
        });

        return deferred.promise;
}])
.factory("Access", ["$q", "UserProfile", function($q, UserProfile) {
  // return AuthenticationService.Access.Factory($q, UserProfile);
  var Access = {

        OK: 200,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,

        isAnonymous: function() {
          var deferred = $q.defer();
          UserProfile.then(function(userProfile) {
            if (userProfile.isAnonymous()) {
              deferred.resolve(Access.OK);
            } else {
              deferred.reject(Access.FORBIDDEN);
            }
          });
          return deferred.promise;
        },

        isAuthenticated: function() {
          var deferred = $q.defer();
          UserProfile.then(function(userProfile) {
            if (userProfile.isAuthenticated()) {
              deferred.resolve(Access.OK);
            } else {
              deferred.reject(Access.UNAUTHORIZED);
            }
          });
          return deferred.promise;
        }

      };
      return Access;
}])
/*.factory("Access", ["$q", "UserProfile", function($q, UserProfile) {
  // return AuthenticationService.Access.Factory($q, UserProfile);
  var Access = {

        OK: 200,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,

        isAnonymous: function() {
          var deferred = $q.defer();
          UserProfile.then(function(userProfile) {
            if (userProfile.isAnonymous()) {
              deferred.resolve(Access.OK);
            } else {
              deferred.reject(Access.FORBIDDEN);
            }
          });
          return deferred.promise;
        },

        isAuthenticated: function() {
          var deferred = $q.defer();
          UserProfile.then(function(userProfile) {
            if (userProfile.isAuthenticated()) {
              deferred.resolve(Access.OK);
            } else {
              deferred.reject(Access.UNAUTHORIZED);
            }
          });
          return deferred.promise;
        }

      };
      return Access;
}])

// UserProfile encapsulates the current user to implement the
// isAnonymous and isAuthenticated methods logic:
.factory("UserProfile", ["$q", "User", function($q, User) {
    // return AuthenticationService.UserProfile.Factory($q, User);
    var deferred = $q.defer();

        User.profile(function(userProfile) {
          deferred.resolve({

            isAnonymous: function() {
              return userProfile.anonymous;
            },

            isAuthenticated: function() {
              return !userProfile.anonymous;
            }

          });
        });

        return deferred.promise;
}])
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
// when Access rejects a promise, the $routeChangeError event will be fired:
.run(["$rootScope", "Access", "$location",
function($rootScope, Access, $location) {

  "use strict";

  $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
    if (rejection == Access.UNAUTHORIZED) {
      $location.path("/dashboard");
    } else if (rejection == Access.FORBIDDEN) {
      $location.path("/home");
    }
  });

}]);*/

module app {
    export var controllers = angular.module('app.controllers',[]);
}
