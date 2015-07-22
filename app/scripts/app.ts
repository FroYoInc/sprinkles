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
});

module app {
    export var controllers = angular.module('app.controllers',[]);
}
