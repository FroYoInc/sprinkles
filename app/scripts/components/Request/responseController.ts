/// <reference path="../../app.ts"/>

// interface used to sign up a user
module Response {

  export interface Scope {
    loadRequestView: Function;
    carpoolRequests: any;
    viewRequests: Function;
  }
  export class Controller {

    constructor($scope:Scope, $location, $http: any) {

        $http.get('http://localhost:3000/api/carpools/requests').success(function(data, status, headers, config) {
          $scope.carpoolRequests = data;
          console.log('success');
        }).error(function(data, status, headers, config){
          if(status == 401){
            console.log('Unauthorized attempt, user must be logged in.');
          }
          else if(status == 404){
            console.log('user not found');
          }
          else if(status == 500){
            console.log('Internal Server error. Unable to make request')
          }
        });


      $scope.loadRequestView = function() {
        $location.url('/ApproveDeny');
      };
    }

  }
}

app.controllers.controller('Response.Controller', Response.Controller);
