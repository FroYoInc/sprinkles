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
            window.scrollTo(0,0);
            $('#notLogged').css('visibility','visible').fadeIn();
          }
          else if(status == 404){
            //'user not found
            window.scrollTo(0,0);
            $('#userNotFound').css('visibility','visible').fadeIn();
          }
          else if(status == 500){
            //Internal Server error. Unable to make request
            window.scrollTo(0,0);
            $('#internalError').css('visibility','visible').fadeIn();
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
              window.scrollTo(0,0);
              $('#successRequest').css('visibility','visible').fadeIn();
            }
          }).error(function(data, status, headers, config){
            if(status == 400){
              window.scrollTo(0,0);
              $('#badRequest').css('visibility','visible').fadeIn();
            }
            else if(status == 401){
              //Unauthorized attempt, user must be logged in
              window.scrollTo(0,0);
              $('#notLogged').css('visibility','visible').fadeIn();
            }
            else if(status == 403){
              //Forbidden. The user must be a member of a carpool to add members.
              window.scrollTo(0,0);
              $('#needApprove').css('visibility','visible').fadeIn();
            }
            else if(status == 404){
              //Missing Resource. Unable to locate either the request, the user, or the carpool.
              window.scrollTo(0,0);
              $('#needResource').css('visibility','visible').fadeIn();
            }
            else if(status == 409){
              //Conflict error. User is already a member of the carpool.
              window.scrollTo(0,0);
              $('#alreadyMember').css('visibility','visible').fadeIn();
            }
            else if(status == 500){
              //Internal Server error. Unable to make request
              window.scrollTo(0,0);
              $('#internalError').css('visibility','visible').fadeIn();
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
            window.scrollTo(0,0);
            $('#successDeny').css('visibility','visible').fadeIn();
          }).error(function(data, status, headers, config){
            if(status == 400){
              window.scrollTo(0,0);
              $('#badRequest').css('visibility','visible').fadeIn();
            }
            else if(status == 401){
              //Unauthorized attempt, user must be logged in
              window.scrollTo(0,0);
              $('#notLogged').css('visibility','visible').fadeIn();
            }
            else if(status == 403){
              //Forbidden. The user must be a member of a carpool to deny members.
              window.scrollTo(0,0);
              $('#needApprove').css('visibility','visible').fadeIn();
            }
            else if(status == 404){
              //Missing Resource. Unable to locate either the request, the user, or the carpool.
              window.scrollTo(0,0);
              $('#needResource').css('visibility','visible').fadeIn();
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

app.controllers.controller('Response.Controller', Response.Controller);
