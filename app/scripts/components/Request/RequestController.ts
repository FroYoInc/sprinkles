/// <reference path="../../app.ts"/>
/// <reference path='carpoolIDModel.ts'/>

// send join request
module Request {

  export interface Scope {
    sendRequest: Function;
    carpoolID: string;

  }
  export class Controller {

    constructor($scope:Scope, $location: any, $http: any, ConfigService: any) {

      $scope.sendRequest = (carid: string) => {
        var carpoolID = new CarpoolModel.CarpoolID();
        carpoolID.carpoolID = carid;

        $http.post(ConfigService.host + ConfigService.port + '/api/carpools/request',carpoolID).success(function(data, status, headers, config) {
          showAlert('#requestSent');
        }).error(function(data, status, headers, config){
          if(status == 400){
            //No carpool ID provided
            showAlert('#noCarpoolid');
          }
          else if(status == 401){
            //Unauthorized attempt, user must be logged in to make a request
            showAlert('#notLogged');
          }
          else if(status == 403){
            //user is already in the carpool
            showAlert('#alreadyJoined');
          }
          else if(status == 409){
            //Conflict error. User already has a request to join this carpool
            showAlert('#requested');
          }
          else if(status == 500){
            //Internal Server error. Unable to make request
            showAlert('#internalError');
          }
        });
      };

    }

  }
}

app.controllers.controller('Request.Controller', Request.Controller);

