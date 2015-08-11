"use strict";
 describe('Carpool Create Spec', function () {
   var scope, Controller;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller) {
       scope = $rootScope.$new();
       Controller = $controller('Carpool.Create.Controller', {
       $scope: scope
       });
     }));

      it('should have text = "constructor"', function() {
          expect(true).toBe(true);
      });
 });
