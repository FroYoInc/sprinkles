/// <reference path="../../app.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_View {

    export interface Scope {
        carpoolList: any;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any, ConfigService: any) {
          //Get the carpool list
          $http.get(ConfigService.host + ConfigService.port + '/api/carpools').success(function(data, status, headers, config) {
             $scope.carpoolList = data;
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
    }
}
app.controllers.controller('Dashboard_Carpools_View.Controller', Dashboard_Carpools_View.Controller);
