/// <reference path="../../app.ts"/>

app.controllers.controller('navbarController',
['$scope', '$location', function ($scope, $location) {
  
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
  };

  $scope.loadHome = function () {
        $location.url('/home');
    };

  $scope.loadSignup = function () {
        $location.url('/signup');
   };
  $scope.loadDashboard = function () {
        $location.url('/dashboard');
   };


}]);
