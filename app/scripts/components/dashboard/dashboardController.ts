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
                // The user is not in a carpool -> Show create carpool
                if (typeof(data) != "undefined") {
                    $scope.carpoolStatus = false;
                } 
                // The user is in a carpool -> Show edit carpool
                else {
                    var newCarpool = new CarpoolModel.CarpoolCookie(data.name, data.description, data.href, data.campus.name, 
                                data.campus.href, data.pickupLocation.address, data.pickupLocation.geoCode.lat, data.pickupLocation.geoCode.long);
                    console.log(data);
                    $cookies.putObject('carpool', newCarpool); 
                    $scope.carpoolStatus = true;          
                }
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
