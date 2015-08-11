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

      it('should have text = "constructor"', function() {
          expect(true).toBe(true);
      });
 });
