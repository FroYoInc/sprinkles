/// <reference path="../../app.ts"/>
/// <reference path="../carpools/editCarpoolController.ts"/>

// interface used to route to other pages
module Dashboard {

    export interface Scope {
        loadDashboard: Function;
        displayCarpools: Function;
        loadCarpoolId: Function;
        createCarpool: Function;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any) {
        $scope.displayCarpools = () => {
          $location.path('dashboard/carpools/view');
        }

        $scope.createCarpool = () => {
          $location.path('dashboard/carpools/create');
        }

    	}
    }
}
app.controllers.controller('Dashboard.Controller', Dashboard.Controller);
