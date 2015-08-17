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
                  showAlert('#resetSuccess');
                  $location.path("/home");
                })
                .error((data, status) => {
                  switch(status){
                    case 400:
                      showAlert('#badRequest');
                      break;
                    case 403:
                      showAlert('#invalidEmail');
                      break;
                    case 404:
                      showAlert('#invalidEmail');
                      break;
                    case 423:
                      showAlert('#resetLockout');
                      break;
                    case 500:
                      showAlert('#internalServer');
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
                  showAlert('#changeSuccess');
                  $location.path("/home");
                })
                .error((data, status) => {
                  switch(status){
                    case 400:
                      showAlert('#badRequest');
                      break;
                    case 401:
                      showAlert('#wrongPassword');
                      break;
                    case 406:
                      showAlert('#unableToChange');
                      break;
                    case 409:
                      showAlert('#passwordConflict');
                      break;
                    case 500:
                      showAlert('#internalServer');
                      break;
                  }
                })
            };
        }
    }
}

app.controllers.controller('PasswordManager.Controller', PasswordManager.Controller);
