"use strict";
 describe('Dashboard Spec', function () {
   var scope, Controller;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
       scope = $rootScope.$new();
       Controller = $controller('Dashboard.Controller', {
       $scope: scope
       });
     }));
 });
