/// <reference path="../../app.ts"/>
/// <reference path='carpoolIDModel.ts'/>

// send join request
module Request {

  export interface Scope {
    sendRequest: Function;
    carpoolID: any;

  }
  export class Controller {

    constructor($scope:Scope, $location: any, $http: any) {

      $scope.sendRequest = (carid: string) => {
        var carpoolID = new CarpoolModel.CarpoolID();
        carpoolID.carpoolID = carid;

        $http.post('http://localhost:3000/api/carpools/request',carpoolID).success(function(data, status, headers, config) {
          console.log('success! - sent!');
        }).error(function(data, status, headers, config){
          if(status == 400){
            console.log('No carpool ID provided.');
          }
          else if(status == 401){
            console.log('Unauthorized attempt, user must be logged in to make a request.');
          }
          else if(status == 409){
            console.log('Conflict error. User already has a request to join this carpool.');
          }
          else if(status == 500){
            console.log('Internal Server error. Unable to make request');
          }
        });
      };

    }

  }
}

app.controllers.controller('Request.Controller', Request.Controller);

