/// <reference path="../../app.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_Edit {

    export interface Scope {
        events: any;
        carpoolId: string;
        carpoolName: string;
        carpoolDescription: string;
        editCarpool: Function;
        loadCarpoolId: Function;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location, $localStorage) {

        $scope.events = this;

        $scope.carpoolId = $localStorage.carpoolId;
        //Default Values
        console.log($scope.carpoolId);
        //Populates the Carpool list
        $scope.editCarpool = function() {

           $http.put('http://localhost:3000/api/carpools/', $scope.carpoolId ).success(function(data, status, headers, config) {
                console.log($scope.carpoolId);
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

        $scope.loadCarpoolId = function(carpoolId) {
          $localStorage.carpoolId = carpoolId;
          console.log("Carpool id from dashboard " + carpoolId);
          $location.path('/dashboard/carpools/edit');
        }
    	}
    }
}
app.controllers.controller('Dashboard_Carpools_Edit.Controller', Dashboard.Controller);

