/// <reference path="../../app.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module CarpoolModule {
  export class Carpool {
    name: string;
    description: string;
    campusID: string;
  } 
}
module Dashboard_Carpools_Edit {

    export interface Scope {
        events: any;
        carpoolId: string;
        carpoolName: string;
        carpoolDescription: string;
        // Carpool address
        // Carpool Geocode
        editCarpool: Function;
        loadCarpoolId: Function;
        carpool: any;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location, $localStorage) {

        $scope.events = this;

        $scope.carpoolId = $localStorage.carpoolId;
        $scope.carpoolName = $localStorage.carpoolName;
        $scope.carpoolDescription = $localStorage.carpoolDescription;
        
        //Default Values
        //Populates the Carpool list
        $scope.editCarpool = function(carpoolName, carpoolDescription) {

           var editedCarpool = new CarpoolModule.Carpool();
           editedCarpool.name = carpoolName;
           editedCarpool.description = carpoolDescription;
           editedCarpool.campusID = "/campuses/de9319fe-5afc-4ce0-89cd-690832c82edf";

           console.log(editedCarpool);
           $http.put('http://localhost:3000/api/carpools/' + $scope.carpoolId, 
                      editedCarpool).success(function(data, status, headers, config) {
              console.log("yay");
              $location.path('/dashboard');
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
                // Carpool address
                // Carpool Geocode
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



