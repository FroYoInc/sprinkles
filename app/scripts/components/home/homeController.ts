/// <reference path="../../app.ts"/>
/// <reference path='usermodel.ts' />

// interface used to get a get user from their email and password during sign
module Home {

    export interface Scope {
        newUserEmail: string;
        newUserPassword: string;
        signIn: Function;
        signInCall: Function;
        visible: Function;
        isAnonymous: Function;
        $new: Function;
    }

    export class Controller {

        constructor ($scope: Scope, $http: any, $location: any, $cookies: any, $controller:any, ConfigService: any) {

            // populate the data when sign in is clicked
            // Handels error alerts when not successful
            $scope.signIn = function () {
                var user        = new UserModel.User();
                user.email      = $scope.newUserEmail;
                user.password   = $scope.newUserPassword;
                user.isAuth     = true;

                var admin = $scope.$new();
                $controller('Admin.Controller',{$scope : admin });

                $http.post(ConfigService.host + ConfigService.port + '/api/users/login', user).
                    success(function (data) {
                        // successful login
                        showAlert("#success");
                        // Auth.setUser(user); //Update the state of the user in the app
                        var newUser = new UserModel.UserCookie(data.email,
                                    data.firstName, data.lastName, data.userID, data.userName);

                        // Check if the user is an admin and then set the cookie and redirect
                        admin.checkAdmin(newUser, () => {
                            $cookies.putObject('user', newUser);
                            $location.path('/dashboard');
                        });
                }).
                    error(function (data, status) {
                        // Bad Request. Invalid or missing parameters.
                        if (status == 400){ //
                            showAlert('#badRequest');
                        }
                        // Unauthorized attempt. User and password combination not found.
                        else if (status == 401){
                            showAlert('#notAuthorized');
                            $scope.newUserPassword = ""; // reset pass field
                        }
                        // The user account has not been activated.
                        else if (status == 403){ //
                            showAlert('#accountNotActivated');
                        }
                        // Not Found)
                        else if (status == 404){ //
                            showAlert('#notFound');
                        }
                        // The user account is locked.
                        else if (status == 423){ //
                            showAlert('#accountIsLocked');
                        }
                        // Internal Server error.
                        else if (status == 500){ //
                            showAlert('#internalError');
                        }


                });

            };

            $scope.visible = function(result:string) {
              $("#" + result).fadeOut();
           };

           $scope.isAnonymous = function(){
            return this.user.isAuth;
           }

        }

    }
}


app.controllers.controller('Home.Controller', Home.Controller);
