"use strict";
 describe('Carpool Create Controller Spec', function () {
   var  scope,
        Controller,
        httpBackend,
        $httpBackend,
        called,
        localStorage,
        location;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller, $injector) {
       scope = $rootScope.$new();
       httpBackend = $injector.get('$httpBackend');
       localStorage = $injector.get('$localStorage');
       location = $injector.get('$location');
       Controller = $controller('Carpool.Create.Controller', {
       $scope: scope
       });
       httpBackend.expectPOST("/api/users").respond(function(){called = true;});

     }));

     beforeEach(function(){
       scope.userEmail = "froyo@froyo.com";
       scope.userPass1 = "pass";
       scope.userPass2 = "pass";
       scope.username = "froyo";
       scope.firstName = "fro";
       scope.lastName = "yo";
       called = false;
     });

      it('should return without making api call when called with error of true', function() {
          scope.signupUser(true);
          expect(called).toBe(false);
      });

      it('should return without making api call when passwords are miss-matched', function() {
          scope.userPass2 = "notthesame";
          scope.signupUser(true);
          expect(called).toBe(false);
      });

      it('should store the text in local storage', function(){
        scope.loadSignup(scope.userEmail, scope.firstName,scope.lastName);
        expect(localStorage.email).toBe(scope.userEmail);
        expect(localStorage.fname).toBe(scope.firstName);
        expect(localStorage.lname).toBe(scope.lastName);
      })
 });
