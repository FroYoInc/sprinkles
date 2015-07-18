/// <reference path="../../app.ts"/>

module Dashboard {

    export interface Scope {
        loadDashboard: Function;
    }
    export class Controller {
    	constructor ($scope: Scope, $http: any, $location: any) {
    		$scope.loadDashboard = function() {
          $location.path('/dashboard');
        }
    	}
    }
}
app.controllers.controller('Dashboard.Controller', Dashboard.Controller);
