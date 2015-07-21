/// <reference path='..\libs\angular\angular.d.ts' />
/// <reference path='..\libs\jquery\jquery.d.ts' />
/// <reference path='..\libs\angular\angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />
/// <reference path='components/dashboard/dashboardController.ts' />


 // http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory
angular.module('Authentication', []);

(function () {
  'use strict';

  angular
      .module('app', ['app.controllers','ngRoute','ngStorage','ngCookies', 'Authentication'])
      .config(config)
      .run(run);

  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
  function config($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .when('/home', {
        templateUrl:    '\\views\\homeView.html',
        controller:     'Home.Controller'
      })
      .when('/signup', {
        templateUrl:    '\\views\\signupView.html',
        controller:     'Signup.Controller'
      })
      .when('/dashboard', {
        templateUrl:    '\\views\\dashboardView.html',
        controller:      'Dashboard.Controller'
      })
      .otherwise( {
        redirectTo:     '/home',
        controller:     'Home.Controller',
      });
}


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
        console.log("Current user is " + $rootScope.globals.currentUser);
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            console.log(" i made a cookie");
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
