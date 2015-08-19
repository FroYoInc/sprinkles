"use strict";
 describe('Navbar controller Spec', function () {
   var scope, Controller;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
       scope = $rootScope.$new();
       Controller = $controller('Navbar.Controller', {
       $scope: scope
       });
     }));
 });
