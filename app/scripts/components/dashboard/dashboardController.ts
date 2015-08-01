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

    	constructor ($scope: Scope, $http: any, $location: any,  $cookies: any) {
            
            //ADD THE USERS CARPOOL STATUS IN THE VIEW
            $http.get('http://localhost:3000/api/user/carpools').success(function(data, status, headers, config) {
                console.log(data);
                // The user is not in a carpool -> Show create carpool
                if (typeof(data) == "undefined") {
                    console.log("False");
                    $scope.carpoolStatus = false;
                } 
                // The user is in a carpool -> Show edit carpool
                else {
                    console.log("true");
                    var newCarpool = new CarpoolModel.CarpoolCookie(data.name, data.description, data.id, data.campus.name, 
                                data.campus, data.pickupLocation.address, data.pickupLocation.geoCode.lat, data.pickupLocation.geoCode.long);
                    console.log("New carpool is", newCarpool);
                    $cookies.putObject('carpool', newCarpool); 
                    $scope.carpoolStatus = true;          
                }
            }).error(function(data, status, headers, config){
                console.log(data);
                console.log(status);
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
