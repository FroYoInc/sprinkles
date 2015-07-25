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
        loadDashboard: Function;
        createCarpool: Function;
    }
    export class Controller {

        constructor ($scope: Scope, $http: any, $location: any) {

            // populate the data when sign in is clicked
            // Handels error alerts when not successful
            $scope.signIn = function () {
                var user        = new UserModel.User();
                user.email      = $scope.newUserEmail;
                user.password   = $scope.newUserPassword;

                $http.post('http://localhost:3000/api/users/login', user).
                    success(function (data) {
                        // successful login
                        $('#success').css('visibility','visible').fadeIn();
                        //$location.path('/dashboard');

                }).
                    error(function (data, status) {
                        // Bad Request. Invalid or missing parameters.
                        if (status == 400){ //
                          window.scrollTo(0,0);
                            $('#badRequest').css('visibility','visible').fadeIn();
                        }
                        // Unauthorized attempt. User and password combination not found.
                        else if (status == 401){
                          window.scrollTo(0,0);
                            $('#notAuthorized').css('visibility','visible').fadeIn();
                            $scope.newUserPassword = ""; // reset pass field
                        }
                        // The user account has not been activated.
                        else if (status == 403){ //
                          window.scrollTo(0,0);
                            $('#accountNotActivated').css('visibility','visible').fadeIn();
                        }
                        // Not Found)
                        else if (status == 404){ //
                          window.scrollTo(0,0);
                            $('#notFound').css('visibility','visible').fadeIn();
                        }
                        // The user account is locked.
                        else if (status == 423){ //
                          window.scrollTo(0,0);
                            $('#accountIsLocked').css('visibility','visible').fadeIn();
                        }
                        // Internal Server error.
                        else if (status == 500){ //
                          window.scrollTo(0,0);
                            $('#internalError').css('visibility','visible').fadeIn();
                        }


                });

            };
            $scope.createCarpool = function(){ console.log("in wrong controller...")}
            $scope.visible = function(result:string) {
             document.getElementById(result).style.display = 'none';
           }

        }

    }
}


app.controllers.controller('Home.Controller', Home.Controller);
