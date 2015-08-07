/// <reference path="../../app.ts"/>
/// <reference path="carpoolmodel.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_Edit {

    export interface Scope {
        events: any;
        carpoolName: string;
        carpoolDescription: string;
        carpoolCampusName: string;
        address: string;
        editCarpool: Function;
        getCampusName: Function;
        getCampus: Function;
        carpool: any;
        campusList: any;

        $new: Function;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location, $cookies: any, ConfigService: any, $controller:any) {

        // Get my cookie
        var newCarpool = $cookies.getObject('carpool');

        //error here because the cookie was not found
        if (typeof(newCarpool) == "undefined") {
          return;
        }

        $scope.events = this;

        // Create a campus list for campus dropdown
        $http.get(ConfigService.host + ConfigService.port + '/api/campuses').success(function(data, status, headers, config) {
          $scope.campusList = data;
        });

        //Do a get incase this was changed somewhere other than the cookie
        $http.get(ConfigService.host + ConfigService.port + '/api/carpools/' + newCarpool.carpool.carpoolID).success(function(data, status, headers, config) {
              $scope.carpoolName = data.name;
              $scope.carpoolDescription = data.description;
              $scope.carpoolCampusName = $scope.getCampusName(data.campus.href);
              $scope.address = data.pickupLocation.address;
        });

        //Default Values
        //Populates the Carpool list
        $scope.editCarpool = function(isInvalidForm) {

        // create an edited carpool to upload to the db and to the cookie
        var editedCarpool = new CarpoolModel.Carpool();
        editedCarpool.carpoolID = newCarpool.carpool.carpoolID;
        editedCarpool.name = $scope.carpoolName;
        editedCarpool.description = $scope.carpoolDescription;
        editedCarpool.campusName = $scope.carpoolCampusName;
        editedCarpool.campus = $scope.getCampus($scope.carpoolCampusName);
        editedCarpool.pickupLocation.address = $scope.address;

        // remove this cookie because I will make a new one
        $cookies.remove('carpool');

        // Update my cookie
        var geoCode = $scope.$new();
        $controller('GeoCoding.Controller',{$scope : geoCode });
        geoCode.geocodeAddress(editedCarpool.pickupLocation.address, (geo) => {
          var updatedCookie = new CarpoolModel.CarpoolCookie(editedCarpool.name, editedCarpool.description, editedCarpool.carpoolID,
                            editedCarpool.campusName, editedCarpool.campus, editedCarpool.pickupLocation.address,
                            geo.lat, geo.long);
          $cookies.putObject('carpool', updatedCookie);
        });
        


        //If the form is invalid, don't make the request
        if(isInvalidForm) {
          return;
        }
         $http.put(ConfigService.host + ConfigService.port + '/api/carpools/' + editedCarpool.carpoolID,
                    editedCarpool).success(function(data, status, headers, config) {
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
        };
        // Get the campus name by the campus ID
        $scope.getCampusName = function(campus) {
          for (var i = 0; i < $scope.campusList.length; i++){
              if ($scope.campusList[i].href == campus){
                return $scope.campusList[i].name;
              }
          }
          return "undefined"
        };
        // Get the campus ID by the campus name
        $scope.getCampus = function(campusName) {
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

