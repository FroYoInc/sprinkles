/// <reference path='..\libs\angular\angular-route.d.ts'/>

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/navbar/navbarController.ts' />
/// <reference path='components/signup/signupController.ts' />
/// <reference path='components/dashboard/dashboardController.ts' />
/// <reference path='components/carpools/createCarpoolController.ts'/>
/// <reference path='components/carpools/viewCarpoolsController.ts'/>


angular.module('app', ['app.controllers','ngRoute','ngStorage','ui.bootstrap'/*, 'ui.router'*/]).
  config(function ($routeProvider, $locationProvider, $httpProvider/*,$stateProvider, $urlRouterProvider*/) {
    /*$urlRouterProvider.otherwise("/home");
    $stateProvider
      .state('home', {
      url: "/home",
      templateUrl: "/views/homeView.html",
      controller: "Home.Controller"
    })
    /*.state('home.list', {
      url: "/list",
      templateUrl: "/views/test.html",
      controller: "Signup.Controller"
    })*/
    /*.state('signup', {
      url: "/signup",
      templateUrl: "/views/signupView.html",
      controller: "Signup.Controller"
    })
    .state('dashboard.carpools.view', {
      url: "/carpools/view",
      templateUrl: "/views/displayCarpoolsView.html",
      controller: "Dashboard_Carpools_View.Controller"
    })
    .state('dashboard.carpools.create', {
      url: "/carpools/create",
      templateUrl: "/views/createCarpoolsView.html",
      controller: "Dashboard_Carpools_Create.Controller"
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "/views/dashboardView.html",
      controller: "Dashboard.Controller"
    })*/
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
      $routeProvider.when('/dashboard/carpools/view',
      {
          templateUrl: '/views/displayCarpoolsView.html',
          controller: 'Dashboard_Carpools_View.Controller'
      });
      $routeProvider.when('/dashboard/carpools/create',
      {
          templateUrl: '/views/createCarpoolView.html',
          controller: 'Dashboard_Carpools_Create.Controller'
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
