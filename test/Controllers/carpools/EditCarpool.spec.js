"use strict";
 describe('Edit Carpool Controller Spec', function () {
   var  scope,
        geoScope,
        Controller,
        GeoController,
        httpBackend,
        $httpBackend,
        called,
        localStorage,
        location,
        cookies;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $controller, $injector) {
       scope = $rootScope.$new();
       httpBackend = $injector.get('$httpBackend');
       localStorage = $injector.get('$localStorage');
       location = $injector.get('$location');
       Controller = $controller('Dashboard_Carpools_Edit.Controller', {
       $scope: scope
       });
       geoScope = $rootScope.$new();
       GeoController = $controller('GeoCoding.Controller', {
       $scope: geoScope
       });
     }));

     beforeEach(function(){
       scope.carpoolName = "myCarpool";
       scope.carpoolDescription = "My first carpool";
       scope.campusName = "PSU";
       scope.participantsArray = ["joe", "sally", "bob"];
       scope.campusList = [{
         name: "PSU",
         href: "PSU"
       },
       {
         name: "UP",
         href: "UP"
       },
       {
         name: "OSU",
         href: "OSU"
       }];
       scope.address = "123 Fake St";
       called = false;
     });

 });
