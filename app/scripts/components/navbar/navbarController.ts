/// <reference path="../../app.ts"/>

app.controllers.controller('navbarController',
['$scope', '$location', '$cookies', function ($scope, $location, $cookies) {
  
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

   $scope.logout = function () {
      var cookie = $cookies.getObject('isAuth');
      if (cookie){
        $cookies.remove('isAuth');
      }
      $location.url('/home');
   }

}]);
