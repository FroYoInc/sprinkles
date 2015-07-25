/// <reference path="../../app.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module CarpoolModule {
  export class Carpool {
    name: string;
    description: string;
  } 
}
module Dashboard_Carpools_Edit {

    export interface Scope {
        events: any;
        carpoolId: string;
        carpoolName: string;
        carpoolDescription: string;
        editCarpool: Function;
        loadCarpoolId: Function;
        carpool: any;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location, $localStorage) {

        $scope.events = this;

        $scope.carpoolId = $localStorage.carpoolId;
        console.log("constructor called");
        $scope.carpoolName = $localStorage.carpoolName;
        $scope.carpoolDescription = $localStorage.carpoolDescription;
        console.log("From constructor " + $scope.carpool);
        
        //Default Values
        //Populates the Carpool list
        $scope.editCarpool = function() {

           $http.put('http://localhost:3000/api/carpools/', $scope.carpoolId ).success(function(data, status, headers, config) {

             }).error(function(data, status, headers, config) {
               //500 server error
               if(status == 500){
                 window.scrollTo(0,0);
                   $('#internalError').css('visibility','visible').fadeIn();
               }
               if(status == 404) {
                 window.scrollTo(0,0);
                   $('#notFound').css('visibility','visible').fadeIn();
               }
             });
        }

        $scope.loadCarpoolId = function(carpoolId) {
          $localStorage.carpoolId = carpoolId;

          $http.get('http://localhost:3000/api/carpools', carpoolId).success(function(data, status, headers, config) {
                $localStorage.carpoolName = data[0].name;
                $localStorage.carpoolDescription = data[0].description;
                console.log($scope.carpool);
                $location.path('/dashboard/carpools/edit');
             }).error(function(data, status, headers, config) {
               //500 server error
               if(status == 500){
                 window.scrollTo(0,0);
                   $('#internalError').css('visibility','visible').fadeIn();
               }
               if(status == 404) {
                 window.scrollTo(0,0);
                   $('#notFound').css('visibility','visible').fadeIn();
               }
             });
          }
    	}
    }
}
app.controllers.controller('Dashboard_Carpools_Edit.Controller', Dashboard_Carpools_Edit.Controller);



