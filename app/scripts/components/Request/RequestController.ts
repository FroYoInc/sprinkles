/// <reference path="../../app.ts"/>
/// <reference path='carpoolIDModel.ts'/>

// send join request
module Request {

  export interface Scope {
    sendRequest: Function;
    carpoolID: string;

  }
  export class Controller {

    constructor($scope:Scope, $location: any, $http: any) {

      $scope.sendRequest = (carid: string) => {
        var carpoolID = new CarpoolModel.CarpoolID();
        carpoolID.carpoolID = carid;

        $http.post('http://localhost:3000/api/carpools/request',carpoolID).success(function(data, status, headers, config) {
          window.scrollTo(0,0);
          $('#requestSent').css('visibility','visible').fadeIn();
        }).error(function(data, status, headers, config){
          if(status == 400){
            //No carpool ID provided
            window.scrollTo(0,0);
            $('#noCarpoolid').css('visibility','visible').fadeIn();
          }
          else if(status == 401){
            //Unauthorized attempt, user must be logged in to make a request
            window.scrollTo(0,0);
            $('#notLogged').css('visibility','visible').fadeIn();
          }
          else if(status == 403){
            //user is already in the carpool
            window.scrollTo(0,0);
            $('#alreadyJoined').css('visibility','visible').fadeIn();
          }
          else if(status == 409){
            //Conflict error. User already has a request to join this carpool
            window.scrollTo(0,0);
            $('#requested').css('visibility','visible').fadeIn();
          }
          else if(status == 500){
            //Internal Server error. Unable to make request
            window.scrollTo(0,0);
            $('#internalError').css('visibility','visible').fadeIn();
          }
        });
      };

    }

  }
}

app.controllers.controller('Request.Controller', Request.Controller);

