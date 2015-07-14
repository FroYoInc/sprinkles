/// <reference path="../../app.ts"/>
/// <reference path='usermodel.ts' />

// interface used to get a get user from their email and password during sign inmodule SignIn{
module Home {

    export interface Scope {
        newUserEmail: string;
        newUserPassword: string;
        signIn: Function;
        signInCall: Function;
    }
    export class Controller {
        
        private httpService: any;
        private httpPromise: any;

        constructor ($scope: Scope, $http: any) {

            
            // populate the data when sign in is clicked
            $scope.signIn = function () {
                var user        = new UserModel.User();
                user.email      = $scope.newUserEmail;
                user.password   = $scope.newUserPassword;


                console.log(user.email);
                console.log(user.password);
                $http.post('http://localhost:3000/api/users/login', user).
                    success(function (data) {
                        console.log(data, status);
                        console.log("status is" + status);
                        // successful login
                        /*
                        if (status == 200){
                            $('#success').css('visibility','visible').fadeIn();
                        }
                        */
                }).
                    error(function (data, status) {
                        console.log("status is" + status);
                        // Bad Request. Invalid or missing parameters.
                        if (status == 400){ //
                            $('#badRequest').css('visibility','visible').fadeIn();
                        }
                        // Unauthorized attempt. User and password combination not found.
                        else if (status == 401){
                            $('#notAuthorized').css('visibility','visible').fadeIn();
                            // $scope.newUserPassword = ""; // reset pass field
                        } 
                        // The user account has not been activated.
                        else if (status == 403){ //
                            $('#accountNotActivated').css('visibility','visible').fadeIn();
                        }
                        // Not Found)
                        else if (status == 404){ //
                            $('#notFound').css('visibility','visible').fadeIn();
                        }

                        // The user account is locked.
                        else if (status == 423){ //
                            $('#accountIsLocked').css('visibility','visible').fadeIn();
                        }
                        // Internal Server error.
                        else if (status == 500){ //
                            $('#internalError').css('visibility','visible').fadeIn();
                        }


                });

            };
                

        }
    }
}


app.controllers.controller('Home.Controller', Home.Controller);
