"use strict";
 describe('Request Controller Spec', function () {
   var scope, Controller;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
       scope = $rootScope.$new();
       Controller = $controller('Request.Controller', {
       $scope: scope
       });
     }));
 });
