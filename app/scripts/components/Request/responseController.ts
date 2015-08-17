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

    constructor($scope:Scope, $route: any, $http: any, ConfigService: any) {

        //grab all requests from carpool that user is in.
        $http.get(ConfigService.host + ConfigService.port + '/api/carpools/requests').success(function(data, status, headers, config) {
          $scope.carpoolRequests = data;


        }).error(function(data, status, headers, config){
          if(status == 401){
            //Unauthorized attempt, user must be logged in
            showAlert('#notLogged');
          }
          else if(status == 404){
            //'user not found
            showAlert('#userNotFound');
          }
          else if(status == 500){
            //Internal Server error. Unable to make request
            showAlert('#internalError');
          }
        });

        //approve the request
        $scope.approveRequest = (carID: string, userIDent: string) => {

          var postData = {
            carpoolID: carID,
            userToAddID: userIDent,
          };

          $http.post(ConfigService.host + ConfigService.port + '/api/carpools/addUser',postData).success(function(data, status, headers, config){
            if(status == 200){
              $route.reload();
              showAlert('#successRequest');
            }
          }).error(function(data, status, headers, config){
            if(status == 400){
              showAlert('#badRequest');
            }
            else if(status == 401){
              //Unauthorized attempt, user must be logged in
              showAlert('#notLogged');
            }
            else if(status == 403){
              //Forbidden. The user must be a member of a carpool to add members.
              showAlert('#needApprove');
            }
            else if(status == 404){
              //Missing Resource. Unable to locate either the request, the user, or the carpool.
              showAlert('#needResource');
            }
            else if(status == 409){
              //Conflict error. User is already a member of the carpool.
              showAlert('#alreadyMember');
            }
            else if(status == 500){
              //Internal Server error. Unable to make request
              showAlert('#internalError');
            }

          });

        };

        //Deny the request
        $scope.denyRequest = (carID: string, userIDent: string) => {

          var postData = {
            carpoolID: carID,
            userToDenyID: userIDent,
          };

          $http.post(ConfigService.host + ConfigService.port + '/api/carpools/denyUser',postData).success(function(data, status, headers, config){
            $route.reload();
            showAlert('#successDeny');
          }).error(function(data, status, headers, config){
            if(status == 400){
              showAlert('#badRequest');
            }
            else if(status == 401){
              //Unauthorized attempt, user must be logged in
              showAlert('#notLogged');
            }
            else if(status == 403){
              //Forbidden. The user must be a member of a carpool to deny members.
              showAlert('#needApprove');
            }
            else if(status == 404){
              //Missing Resource. Unable to locate either the request, the user, or the carpool.
              showAlert('#needResource');
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

app.controllers.controller('Response.Controller', Response.Controller);
