/// <reference path="../../app.ts"/>
/// <reference path="carpoolmodel.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_Edit {

    export interface Scope {
        events: any;
        carpoolID: string;
        carpoolName: string;
        carpoolDescription: string;
        carpoolCampusName: string;
        address: string;
        lat: number;
        longitude: number;
        editCarpool: Function;
        carpool: any;
        campusList: any;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location, $cookies: any) {

        $http.get('http://localhost:3000/api/campuses').success(function(data, status, headers, config) {
          $scope.campusList = data;
          });
        var newCarpool = $cookies.getObject('carpool');
        if (typeof(newCarpool) == "undefined") {
          return; //error here
        }
        $scope.events = this;
        //Do a get incase this was changed somewhere other than the cookie
        $http.get('http://localhost:3000/api/carpools/' + newCarpool.carpoolID).success(function(data, status, headers, config) {
              $scope.carpoolID = data.carpoolID;
              $scope.carpoolName = data.name;
              $scope.carpoolCampusName = data.campus.name;
              $scope.carpoolDescription = data.description;
              $scope.address = data.pickupLocation.address;
              $scope.lat = data.pickupLocation.lat;
              $scope.longitude = data.pickupLocation.long;
        });

        


        //Default Values
        //Populates the Carpool list
        $scope.editCarpool = function(isInvalidForm) {

          // create an edited carpool to upload to the db and to the cookie
          var editedCarpool = new CarpoolModel.Carpool();
          editedCarpool.carpoolID = $scope.carpoolID;
          editedCarpool.name = $scope.carpoolName;
          editedCarpool.description = $scope.carpoolDescription;
          editedCarpool.pickupLocation.address = $scope.address;
          editedCarpool.pickupLocation.geoCode.lat = $scope.lat;
          editedCarpool.pickupLocation.geoCode.long = $scope.longitude;

          for (var i = 0; i < $scope.campusList.length; i++){
            if ($scope.campusList[i].name ==  $scope.carpoolCampusName)
              editedCarpool.campusID = $scope.campusList[i].href;
              editedCarpool.campusName = $scope.carpoolCampusName;
           }
          $cookies.remove('carpool');
          var updatedCookie = new CarpoolModel.CarpoolCookie(editedCarpool.name, editedCarpool.description, editedCarpool.carpoolID, 
                              editedCarpool.campusName, editedCarpool.campusID, editedCarpool.pickupLocation.address, 
                              editedCarpool.pickupLocation.geoCode.lat, editedCarpool.pickupLocation.geoCode.long);
                    $cookies.putObject('carpool', updatedCookie);
          //If the form is invalid, don't make the request
          if(isInvalidForm) {
            return;
          }
           console.log(editedCarpool);
           // This call may be messed up if I pass in the carpool name too
           $http.put('http://localhost:3000/api/carpools/' + $scope.carpoolID, 
                      editedCarpool).success(function(data, status, headers, config) {
                      console.log(data);
              $location.path('/dashboard');
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

    	}
    }
}
app.controllers.controller('Dashboard_Carpools_Edit.Controller', Dashboard_Carpools_Edit.Controller);



