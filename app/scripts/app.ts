/// <reference path='..\libs\angular\angular.d.ts' />
/// <reference path='..\libs\jquery\jquery.d.ts' />
/// <reference path='..\libs\angular\angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />


angular.module('app', ['app.controllers','ngRoute']).
  config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/home',
    {
      templateUrl:    'views\homeView.html',
      controller:     'homeController'
    });
    $routeProvider.when('/about',
    {
      templateUrl:    'views\homeView.html',
      controller:     'signupController'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     'views\homeView.html',
      controller:     'homeController',
    }
  )
});

module app {
    export var controllers = angular.module('app.controllers',[]);
}
