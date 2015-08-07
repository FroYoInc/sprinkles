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
    loadCarpoolsEdit: Function;
    loadAdmin: Function;
    $watch: any;

    isAuth: Boolean;
    isAdmin: Boolean;
    isInCarpool: Boolean;
  }

  export class Controller {

    constructor ($scope: Scope, $location: any, $cookies: any, $http:any, ConfigService:any) {
      var cookie = $cookies.getObject('user');
      if (typeof(cookie) != "undefined"){
        $scope.isAuth = cookie.isAuth;
      }
      var carpoolCookie = $cookies.getObject('carpool');
      if (typeof(carpoolCookie) != "undefined"){
        $scope.isInCarpool = true;
      } else {
        $scope.isInCarpool = false;
      }
      //Watches to  see if cookies change. If the isAuth cookie is changed, update
      //its value.
      $scope.$watch(function() {
              var cookie = $cookies.getObject('user');
              var carpoolCookie = $cookies.getObject('carpool');
              if (typeof(carpoolCookie) != "undefined"){
                $scope.isInCarpool = true;
              } else {
                $scope.isInCarpool = false;
              }
              if (typeof(cookie) != "undefined"){
                return cookie.isAuth;
              }
          }, function(newValue) {
          var cookie = $cookies.getObject('user');
          if (typeof(cookie) != "undefined"){
            $scope.isAuth = cookie.isAuth;
          }
          if (typeof(cookie) != "undefined"){
            $scope.isAdmin = cookie.isAdmin;
          }
          var carpoolCookie = $cookies.getObject('carpool');
          if (typeof(carpoolCookie) != "undefined"){
            $scope.isInCarpool = true;
          } else {
            $scope.isInCarpool = false;
          }
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
       $scope.loadCarpoolsEdit = () => {
         $location.url('/dashboard/carpools/edit')
       }
       $scope.loadCarpoolsCreate = () => {
         $location.url('/dashboard/carpools/create')
       }
       $scope.loadAdmin = () => {
         $location.url('/dashboard/admin')
       }
       
      // Removes the cookie and re-routes to the home page
      $scope.logout = () => {
         $scope.isAuth = false;
          var cookie = $cookies.getObject('user');
          if (cookie.isAuth){
            $cookies.remove('user');
          }
          var cookie = $cookies.getObject('carpool');
          if (typeof(cookie) != undefined){
            $cookies.remove('carpool');
          }
          $http.get(ConfigService.host + ConfigService.port + "/api/users/logout")
            .success( (data) => {
              $location.url('/home');
            })
            .error( (status, data) => {
              $location.url('/home');
            })
       }
    }
  }
}
app.controllers.controller('Navbar.Controller', Navbar.Controller);
