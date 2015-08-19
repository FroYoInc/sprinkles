"use strict";
 describe('Create Carpool Controller Spec', function () {
   var  scope,
        geoScope,
        Controller,
        GeoController,
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
       Controller = $controller('Dashboard_Carpools_Create.Controller', {
       $scope: scope
       });
       geoScope = $rootScope.$new();
       GeoController = $controller('GeoCoding.Controller', {
       $scope: geoScope
       });
       httpBackend.expectPOST("/api/users").respond(function(){called = true;});
     }));

     beforeEach(function(){
       scope.name = "myCarpool";
       scope.campus = "PSU";
       scope.description = "My first carpool";
       scope.campusList = ["PSU", "UP", "OSU"];
       scope.address = "123 Fake St";
       scope.lat = 100;
       scope.long = 100;
       called = false;
     });

      it('should return without making api call when called with error of true', function() {
          scope.createCarpool(true);
          expect(called).toBe(false);
      });

      it('should return without making api call when the address is not valid', function() {
          spyOn(geoScope, "geocodeAddress").and.returnValue(null);
          scope.createCarpool();
          expect(called).toBe(false);
      });

 });
