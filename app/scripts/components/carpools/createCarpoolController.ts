/// <reference path="../../app.ts"/>
/// <reference path="carpoolmodel.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_Create {

    export interface Scope {
        name: string;
        campus: string;
        description: string;
        campusList: any;
        address: string;
        lat: number;
        long: number;
        userNotFound: Boolean;
        carpoolExists: Boolean;
        createCarpool: Function;

        $new: Function;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any, $cookies: any, ConfigService: any, $controller:any) {

        //Populate campus list
        $http.get(ConfigService.host + ConfigService.port + '/api/campuses').success(function(data, status, headers, config) {
          $scope.campusList = data;
        });

        $scope.createCarpool = (isInvalidForm) => {
          var postData = new CarpoolModel.Carpool();
          postData.name = $scope.name;
          postData.description = $scope.description;
          postData.campus = $scope.campus;
          postData.pickupLocation.address = $scope.address;

          //Hide previous errors:
          $scope.userNotFound = false;
          $scope.carpoolExists = false;

          //If the form is invalid, don't make the request
          if(isInvalidForm) {
            return;
          }
            // Update my cookie
          var geoCode = $scope.$new();
          $controller('GeoCoding.Controller',{$scope : geoCode });
          geoCode.geocodeAddress(postData.pickupLocation.address, (geo) => {
            if (geo === null) {
              return; // test to see if the address is vaild.
            }
            postData.pickupLocation.geoCode = geo;


            var ownerCookie = $cookies.getObject('user');
            postData.owner = ownerCookie.userName;
            //Attempt to post data
            $http.post(ConfigService.host + ConfigService.port + '/api/carpools', postData).success(function(data, status, headers, config) {
                $location.path('/dashboard');
                showAlert('#carpoolCreated');
                var updatedCookie = new CarpoolModel.CarpoolCookie(postData.name, postData.description, null,
                                  null, postData.campus, postData.pickupLocation.address,
                                  geo.lat, geo.long);
                $cookies.putObject('carpool', updatedCookie);
              }).error(function(data, status, headers, config) {
                //406: Owner not found
                if(status == 406 && ((data.message).localeCompare("CarpoolOwnerNotFoundException: carpool owner user not found") == 0)){
                    $scope.userNotFound = true;
                }
                //409: Carpool already Exists
                if(status == 409){
                  $scope.carpoolExists = true;
                }
                //500: Server error
                if(status == 500){
                    showAlert('#internalError');
                }
              });
          });

        }
    	}
    }
}
app.controllers.controller('Dashboard_Carpools_Create.Controller', Dashboard_Carpools_Create.Controller);
