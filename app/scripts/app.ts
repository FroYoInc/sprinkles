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
module Auth {
  export var authService = angular.module('AuthModule',[]);
  appTest.factory('Auth', function(){
  var user;

  return{
      setUser : function(aUser){
          user = aUser;
      },
      isLoggedIn : function(){
          return(user)? user : false;
      }
    }
  })
}


.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (!Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/home');
        }
        else {
            console.log('ALLOW');
            $location.path('/dashboard');
        }
    });
}]);

module app {
    export var controllers = angular.module('app.controllers',[]);
}
