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
        getCampusName: Function;
        getCampusID: Function;
        carpool: any;
        campusList: any;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location, $cookies: any) {

        // Get my cookie
        var newCarpool = $cookies.getObject('carpool');

        //error here because the cookie was not found
        if (typeof(newCarpool) == "undefined") {
          return; 
        }
        // Set the cookies carpoolID (This value will never change)
        $scope.carpoolID = newCarpool.carpool.carpoolID;
        $scope.events = this;

        $http.get('http://localhost:3000/api/campuses').success(function(data, status, headers, config) {
          $scope.campusList = data;
        });

        //Do a get incase this was changed somewhere other than the cookie
        $http.get('http://localhost:3000/api/carpools/' + newCarpool.carpool.carpoolID).success(function(data, status, headers, config) {
              $scope.carpoolName = data.name;
              $scope.carpoolDescription = data.description;
              console.log("id name is ", data.campus.href);
              console.log("returned name is ", $scope.getCampusName(data.campus.href));
              $scope.carpoolCampusName = $scope.getCampusName(data.campus.href);
              $scope.address = data.pickupLocation.address;
              $scope.lat = data.pickupLocation.geoCode.lat;
              $scope.longitude = data.pickupLocation.geoCode.long;
        });

        //Default Values
        //Populates the Carpool list
        $scope.editCarpool = function(isInvalidForm) {

          // create an edited carpool to upload to the db and to the cookie
          var editedCarpool = new CarpoolModel.Carpool();
          editedCarpool.carpoolID = $scope.carpoolID;
          editedCarpool.name = $scope.carpoolName;
          editedCarpool.description = $scope.carpoolDescription;
          editedCarpool.campusName = $scope.carpoolCampusName;
          editedCarpool.campusID = $scope.getCampusID($scope.carpoolCampusName);
          editedCarpool.pickupLocation.address = $scope.address;
          editedCarpool.pickupLocation.geoCode.lat = $scope.lat;
          editedCarpool.pickupLocation.geoCode.long = $scope.longitude;

          $cookies.remove('carpool');
          // Update my cookie 
          var updatedCookie = new CarpoolModel.CarpoolCookie(editedCarpool.name, editedCarpool.description, editedCarpool.carpoolID, 
                              editedCarpool.campusName, editedCarpool.campusID, editedCarpool.pickupLocation.address, 
                              editedCarpool.pickupLocation.geoCode.lat, editedCarpool.pickupLocation.geoCode.long);
                    $cookies.putObject('carpool', updatedCookie);


          //If the form is invalid, don't make the request
          if(isInvalidForm) {
            return;
          }
           console.log("editCarpool is ", editedCarpool);
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
        // Get the campus name by the campus ID
        $scope.getCampusName = function(campusID) {
          for (var i = 0; i < $scope.campusList.length; i++){
              if ($scope.campusList[i].href == campusID){
                return $scope.campusList[i].name;
              }
          }
          return "undefined"
        }
        // Get the campus ID by the campus name
        $scope.getCampusID = function(campusName) {
          for (var i = 0; i < $scope.campusList.length; i++){
              if ($scope.campusList[i].name == campusName){
                return $scope.campusList[i].href;
              }
          }
          return "undefined"
        }

    	}

      
    }
}
app.controllers.controller('Dashboard_Carpools_Edit.Controller', Dashboard_Carpools_Edit.Controller);



