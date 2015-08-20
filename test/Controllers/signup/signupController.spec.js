 "use strict";
  describe('Signup Controller Spec', function () {
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
        //httpBackend.when("POST", "/api/users'").respond([{called: true}, {called: true}, {called: true}]);
        //httpBackend.whenPOST("/api/users").respond([{called: true}])
        Controller = $controller('Signup.Controller', {
        $scope: scope
        });
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

       xit('should be called when the passwords match', function(){
         httpBackend.expectPOST("/api/users").respond("pig");
         scope.signupUser();
         console.log(location)
         //httpBackend.flush();
         //expect(scope.signupUser()).to.not.throw();
         //expect(called).toBe(true);
       })

       it('should store the text in local storage', function(){
         scope.loadSignup(scope.userEmail, scope.firstName,scope.lastName);
         expect(localStorage.email).toBe(scope.userEmail);
         expect(localStorage.fname).toBe(scope.firstName);
         expect(localStorage.lname).toBe(scope.lastName);
       })
  });
