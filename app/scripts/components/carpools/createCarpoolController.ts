/// <reference path="../../app.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_Create {

    export interface Scope {
        name: string;
        campus: string;
        description: string;
        owner: string;

        createCarpool: Function;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any) {
        $scope.createCarpool = function() {
          console.log("n/c/d/o", $scope.name, $scope.campus, $scope.description, $scope.owner)
        }
    	}
    }
}
app.controllers.controller('Dashboard_Carpools_Create.Controller', Dashboard_Carpools_Create.Controller);
