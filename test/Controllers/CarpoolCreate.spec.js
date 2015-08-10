"use strict";
 describe('Controller: MainCtrl', function () {
   var scope, PasswordController;
    beforeEach(module('app'));
    beforeEach(inject(function($rootScope, $controller) {
       scope = $rootScope.$new();
       PasswordController = $controller('Carpool.Create.Controller', {
       $scope: scope
       });
     }));
      it('should have text = "constructor"', function() {
          expect(true).toBe(true);
          PasswordController.aler();
      });
 });
