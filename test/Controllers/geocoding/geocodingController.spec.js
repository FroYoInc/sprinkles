"use strict";
 describe('Geocoding Controller Spec', function () {
   var scope, Controller;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
       scope = $rootScope.$new();
       Controller = $controller('GeoCoding.Controller', {
       $scope: scope
       });
     }));
 });
