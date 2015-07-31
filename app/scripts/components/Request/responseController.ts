/// <reference path="../../app.ts"/>


// respond to requests
module Response {

  export interface Scope {
    loadRequestView: Function;
    carpoolRequests: any;
    carIdent: any;
    userIdent: any;
    carpoolID: string;
    userToAddID: string;
    userToDenyID: string;
    viewRequests: Function;
    approveRequest: Function;
    denyRequest: Function;
  }
  export class Controller {

    constructor($scope:Scope, $location, $http: any) {

        $http.get('http://localhost:3000/api/carpools/requests').success(function(data, status, headers, config) {
          $scope.carpoolRequests = data;


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

        $scope.approveRequest = (carID: string, userIDent: string) => {

          var postData = {
            carpoolID: carID,
            userToAddID: userIDent,
          };

          $http.post('http://localhost:3000/api/carpools/addUser',postData).success(function(data, status, headers, config){
            console.log('approve successful');
          }).error(function(data, status, headers, config){
            if(status == 400){
              console.log('One or more missing parameters');
            }
            else if(status == 401){
              console.log('Unauthorized attempt, user must be logged in.');
            }
            else if(status == 403){
              console.log('Forbidden. The user must be a member of a carpool to add members.');
            }
            else if(status == 404){
              console.log('Missing Resource. Unable to locate either the request, the user, or the carpool.');
            }
            else if(status == 409){
              console.log('Conflict error. User is already a member of the carpool.');
            }
            else if(status == 500){
              console.log('Internal Server error. Unable to make request');
            }

          });

        };

        $scope.denyRequest = (carID: string, userIDent: string) => {

          var postData = {
            carpoolID: carID,
            userToDenyID: userIDent,
          };

          $http.post('http://localhost:3000/api/carpools/denyUser',postData).success(function(data, status, headers, config){
            console.log('Denied user');
          }).error(function(data, status, headers, config){
            if(status == 400){
              console.log('One or more missing parameters');
            }
            else if(status == 401){
              console.log('Unauthorized attempt, user must be logged in.');
            }
            else if(status == 403){
              console.log('Forbidden. The user must be a member of a carpool to deny a member.');
            }
            else if(status == 404){
              console.log('Request not found');
            }
            else if(status == 500){
              console.log('Internal Server error. Unable to make request');
            }

          });

        };

        $scope.loadRequestView = function() {
          $location.url('/ApproveDeny');
        };


    }

  }
}

app.controllers.controller('Response.Controller', Response.Controller);
