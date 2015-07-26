/// <reference path="../../app.ts"/>

module Navbar {
  export interface Scope {
    navClass: Function;
    loadHome: Function;
    loadSignup: Function;
    loadDashboard: Function;
    logout: Function;
    loadCarpoolsView: Function;
    loadCarpoolsCreate: Function;
    $watch: any;

    isAuth: Boolean;
  }

  export class Controller {

    constructor ($scope: Scope, $location: any, $cookies: any) {
      $scope.isAuth = $cookies.getObject('isAuth');

      //Watches to  see if cookies change. If the isAuth cookie is changed, update
      //its value.
      $scope.$watch(function() { return $cookies.isAuth; }, function(newValue) {
          $scope.isAuth = $cookies.isAuth;
      });

      //Controls the active page
      $scope.navClass = (page) => {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
      };

      $scope.loadHome = () => {
            $location.url('/home');
        };

      $scope.loadSignup = () => {
            $location.url('/signup');
       };

      $scope.loadDashboard = () => {
            $location.url('/dashboard');
       };

       $scope.loadCarpoolsView = () => {
         $location.url('/dashboard/carpools/view')
       }

       $scope.loadCarpoolsCreate = () => {
         $location.url('/dashboard/carpools/create')
       }
       
      // Removes the cookie and re-routes to the home page
      $scope.logout = () => {
         $scope.isAuth = false;
          var cookie = $cookies.getObject('isAuth');
          if (cookie){
            $cookies.remove('isAuth');
          }
          $location.url('/home');
       }
    }
  }
}
app.controllers.controller('Navbar.Controller', Navbar.Controller);
