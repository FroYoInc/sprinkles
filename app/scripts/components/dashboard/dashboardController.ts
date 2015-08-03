/// <reference path="../../app.ts"/>
/// <reference path="../carpools/editCarpoolController.ts"/>

// interface used to route to other pages
module Dashboard {

    export interface Scope {
        loadDashboard: Function;
        displayCarpools: Function;
        loadCarpoolId: Function;
        createCarpool: Function;
        editCarpool: Function;
        carpoolStatus: Boolean;
        carpoolStatusString: string;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any,  $cookies: any, config: any) {

            // Get carpool cookie if it has already been created
            var newCarpool = $cookies.getObject('carpool');
            if (typeof(newCarpool) == "undefined"){
                $scope.carpoolStatus = false;
            }
            $http.get(config.host + config.port + '/api/user/carpools').success(function(data, status, headers, config) {
                // The user is not in a carpool -> Show create carpool
                if (data == ""  && typeof(newCarpool) == "undefined") {
                    $scope.carpoolStatus = false;
                }
                // The user is in a carpool -> Show edit carpool
                else {
                    var newCarpool = new CarpoolModel.CarpoolCookie(data.name, data.description, data.id, data.campus.name,
                                data.campus, data.pickupLocation.address, data.pickupLocation.geoCode.lat, data.pickupLocation.geoCode.long);
                    $cookies.putObject('carpool', newCarpool);
                    $scope.carpoolStatusString = data.name;
                    $scope.carpoolStatus = true;
                }
            }).error(function(data, status, headers, config){

            });


            $scope.displayCarpools = () => {
              $location.path('dashboard/carpools/view');
            }

            $scope.createCarpool = () => {
              $location.path('dashboard/carpools/create');
            }
            $scope.editCarpool = () => {
              $location.path('dashboard/carpools/edit');
            }

    	}
    }
}
app.controllers.controller('Dashboard.Controller', Dashboard.Controller);
