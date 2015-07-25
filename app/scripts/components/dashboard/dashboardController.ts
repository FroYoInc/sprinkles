/// <reference path="../../app.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard {

    export interface Scope {
        showCarpools: boolean;
        status: any;
        carpoolList: any;
        loadDashboard: Function;
        displayCarpools: Function;
        createCarpool: Function;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any, $localStorage) {
        //Default Values
        //$scope.showCarpools = true;

        /*$http.get('http://localhost:3000/api/carpools').success(function(data, status, headers, config) {
            $scope.carpoolList = data;
            $scope.status = status;
        }).error(function(data, status, headers, config) {
              $scope.status = status;
              //500 server error
              if(status == 500){
                window.scrollTo(0,0);
                  $('#internalError').css('visibility','visible').fadeIn();
              }
              if(status == 404) {
                window.scrollTo(0,0);
                  $('#notFound').css('visibility','visible').fadeIn();
              }
            });*/

        $scope.displayCarpools = () => {
                      $location.path('dashboard/carpools/view');
          if($scope.status == 200){
            console.log("display")
            $location.path('dashboard/carpools/view');
          }
        }

        $scope.createCarpool = () => {
          console.log("woops..")
          $location.path('dashboard/carpools/create');

            if($scope.status == 200) {
              $location.path('dashboard/carpools/create');
            }
        }
    	}
    }
}
app.controllers.controller('Dashboard.Controller', Dashboard.Controller);
