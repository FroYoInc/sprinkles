/// <reference path="../../app.ts"/>

app.controllers.controller('navbarController',
['$scope', '$location', function ($scope, $location) {
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
  };

  $scope.loadHome = function () {
        $location.url('/home');
        console.log("in loadhome");
        $scope.$apply();
    };

      $scope.loadAbout = function () {
        $location.url('/about');
        console.log("in loadabout");
        $scope.$apply();
    };

      $scope.loadContact = function () {
        $location.url('/contact');
        console.log("in loadcontact");
        $scope.$apply();
    };

}]);
