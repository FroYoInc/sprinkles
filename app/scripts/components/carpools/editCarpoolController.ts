/// <reference path="../../app.ts"/>
/// <reference path="carpoolmodel.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_Edit {

    export interface Scope {
        events: any;
        carpoolId: string;
        carpoolName: string;
        carpoolDescription: string;
        carpoolCampus: string;
        // Carpool address
        // Carpool Geocode
        editCarpool: Function;
        loadCarpoolId: Function;
        carpool: any;
        campusList: any;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location, $localStorage) {

        $http.get('http://localhost:3000/api/campuses').success(function(data, status, headers, config) {
          $scope.campusList = data;
          });

        $scope.events = this;

        $scope.carpoolId = $localStorage.carpoolId;
        $scope.carpoolName = $localStorage.carpoolName;
        $scope.carpoolDescription = $localStorage.carpoolDescription;

        //Default Values
        //Populates the Carpool list
        $scope.editCarpool = function(isInvalidForm) {

           var editedCarpool = new CarpoolModel.Carpool();
           editedCarpool.name = $scope.carpoolName;
           editedCarpool.description = $scope.carpoolDescription;
           console.log($scope.carpoolCampus);
           for (var i = 0; i < $scope.campusList.length; i++){
            console.log($scope.campusList[i].name + "vs" + $scope.carpoolCampus);
            if ($scope.campusList[i].name == $scope.carpoolCampus)
              editedCarpool.campusID = $scope.campusList[i].href;
           }

          //If the form is invalid, don't make the request
          if(isInvalidForm) {
            return;
          }
           console.log(editedCarpool);
           $http.put('http://localhost:3000/api/carpools/' + $scope.carpoolId, 
                      editedCarpool).success(function(data, status, headers, config) {
                        console.log(data);
              $location.path('/dashboard');
              $localStorage.$reset();
              window.scrollTo(0,0);
              $('#carpoolUpdated').css('visibility','visible').fadeIn();
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

          $http.get('http://localhost:3000/api/carpools/' + carpoolId).success(function(data, status, headers, config) {
              //TODO Check to see if this user has access to the carpool
              $localStorage.carpoolName = data.name;
              $localStorage.carpoolDescription = data.description;
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



