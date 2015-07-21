/// <reference path="../../app.ts"/>

module Dashboard {

    export interface Scope {
        showCarpools: boolean;
        internalError: boolean;
        carpoolList: any;
        loadDashboard: Function;
        displayCarpools: Function;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any) {
        $scope.showCarpools = false;

        $scope.displayCarpools = function() {
           $scope.showCarpools = !$scope.showCarpools;
           console.log(">>>",$scope.showCarpools);
           $http.post('http://localhost:3000/api/carpools').success(function(data, status, headers, config) {
              console.log("data=", data);
              $scope.carpoolList = data;
             }).error(function(data, status, headers, config) {
               //500 server error
               if(status == 500){
                 window.scrollTo(0,0);
                   $('#internalError').css('visibility','visible').fadeIn();
               }
               if(status == 400) {
                 window.scrollTo(0,0);
                   $('#notFound').css('visibility','visible').fadeIn();
               }

             });
        }

    		$scope.loadDashboard = function() {
          $location.path('/dashboard');
        }
    	}
    }
}
app.controllers.controller('Dashboard.Controller', Dashboard.Controller);
