module PasswordManager {
    export interface Scope{
        resetPassword: Function;
        changePassword: Function;
        submitted: Boolean;
        resetEmail: String;
        currentPassword: String;
        newPassword: String;
        confirmPassword: String;

    }

    export class Controller{
        constructor ($scope: Scope, $http: any, $location: any, $cookies: any, ConfigService: any) {

            $scope.resetPassword = (invalidForm, forgotPasswordStatus) => {

              if(invalidForm){
                  return;
              }

              var data = {
                email: $scope.resetEmail
              }
              $http.put(ConfigService.host + ConfigService.port + '/api/users/password/reset', data)
                .success((data) => {
                  window.scrollTo(0,0);
                  $('#resetSuccess').css('visibility','visible').fadeIn();
                  $location.path("/home");
                })
                .error((data, status) => {
                  window.scrollTo(0,0);
                  switch(status){
                    case 400:
                      $('#badRequest').css('visibility','visible').fadeIn();
                      break;
                    case 403:
                      $('#invalidEmail').css('visibility','visible').fadeIn();
                      break;
                    case 404:
                      $('#invalidEmail').css('visibility','visible').fadeIn();
                      break;
                    case 423:
                      $('#resetLockout').css('visibility','visible').fadeIn();
                      break;
                    case 500:
                      $('#internalServer').css('visibility','visible').fadeIn();
                      break;
                  }
                })
            };

            $scope.changePassword = (invalidForm) => {
              console.log(invalidForm);
              if(invalidForm){
                  return;
              }

              if($scope.newPassword !== $scope.confirmPassword){
                return;
              }

              var data = {
                curPassword: $scope.currentPassword,
                newPassword: $scope.newPassword,
                confirmPassword: $scope.confirmPassword
              }
              $http.put(ConfigService.host + ConfigService.port + '/api/users/password', data)
                .success((data) => {
                  window.scrollTo(0,0);
                  $('#changeSuccess').css('visibility','visible').fadeIn();
                  $location.path("/home");
                })
                .error((data, status) => {
                  window.scrollTo(0,0);
                  switch(status){
                    case 400:
                      $('#badRequest').css('visibility','visible').fadeIn();
                      break;
                    case 401:
                      $('#wrongPassword').css('visibility','visible').fadeIn();
                      break;
                    case 406:
                      $('#unableToChange').css('visibility','visible').fadeIn();
                      break;
                    case 409:
                      $('#passwordConflict').css('visibility','visible').fadeIn();
                      break;
                    case 500:
                      $('#internalServer').css('visibility','visible').fadeIn();
                      break;
                  }
                })
            };
        }
    }
}

app.controllers.controller('PasswordManager.Controller', PasswordManager.Controller);
