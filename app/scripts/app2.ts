/// <reference path='..\libs\angular\angular.d.ts' />
/// <reference path='..\libs\jquery\jquery.d.ts' />
/// <reference path='..\libs\angular\angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />
/// <reference path='components/dashboard/dashboardController.ts' />


 // http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory
angular.module('app', ['app.controllers','ngRoute','ngStorage'])

.config(function ($routeProvider, $locationProvider, $httpProvider) {

    "use strict"; // do I need this?

    $routeProvider
      .when('/home', {
        templateUrl:    '\\views\\homeView.html',
        controller:     'Home.Controller',
        // Error: [$injector:unpr] Unknown provider: AccessProvider <- Access <- access
        resolve: {
          access: ["Access", function(Access) { return Access.isAnonymous(); }],
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
          access: ["Access", function(Access) { return Access.isAuthenticated(); }],
        }
      })
      .otherwise( {
        redirectTo:     '/home',
        controller:     'Home.Controller',
      });
})

var appTest = angular.module('SampleApp',['ngResource']);

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

appTest.factory("Access", ["$q", "UserProfile", function($q, UserProfile) {
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
}]);

// UserProfile encapsulates the current user to implement the 
// isAnonymous and isAuthenticated methods logic:
appTest.factory("UserProfile", ["$q", "User", function($q, User) {
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
}]);
// User is a standard AngularJS resource with a profile method (needs angular-resource):
appTest.factory("User", ["$resource", function($resource) {
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

}]);

module app {
    export var controllers = angular.module('app.controllers',[]);
}
/// <reference path='..\libs\angular\angular.d.ts' />
/// <reference path='..\libs\jquery\jquery.d.ts' />
/// <reference path='..\libs\angular\angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />
/// <reference path='components/dashboard/dashboardController.ts' />


 // http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory

(function () {
  'use strict';

  angular
      .module('app', ['app.controllers','ngRoute','ngStorage','ngCookies'])
      .config(config)
      .run(run);

  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
  function config($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .when('/home', {
        templateUrl:    '\\views\\homeView.html',
        controller:     'Home.Controller',
        controllerAs: 'vm'
      })
      .when('/signup', {
        templateUrl:    '\\views\\signupView.html',
        controller:     'Signup.Controller',
        controllerAs: 'vm'
      })
      .when('/dashboard', {
        templateUrl:    '\\views\\dashboardView.html',
        controller:      'Dashboard.Controller',
        controllerAs: 'vm'
      })
      .otherwise( {
        redirectTo:     '/home',
        controller:     'Home.Controller',
        controllerAs: 'vm',
      });
})


// Ignore this for now 
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

// THis needs to be called in homeController but I haven't figured out how to export it so that 
// home controller can look at it. That is what authSerivce is trying to do


run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/home', '/signup']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/home');
            }
        });
    }

})();

module app {
    export var controllers = angular.module('app.controllers',[]);
}
