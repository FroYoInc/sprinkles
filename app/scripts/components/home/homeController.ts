/// <reference path="../../app.ts"/>
/// <reference path='usermodel.ts' />

// interface used to get a get user from their email and password during sign inmodule SignIn{
module Home {

    export interface Scope {
        newUserEmail: string;
        newUserPassword: string;
        signIn: Function;
        signUp: Function;
        signInCall: Function;
    }
    export class Controller {

        private httpService: any;
        private httpPromise: any;

        constructor ($scope: Scope, $http: any) {

<<<<<<< HEAD
            this.httpService = $http;

=======
            
>>>>>>> controllerTest
            // populate the data when sign in is clicked
            $scope.signIn = function () {
                var user        = new UserModel.User();
                user.email      = $scope.newUserEmail;
                user.password   = $scope.newUserPassword;


<<<<<<< HEAD
                console.log(testUser.Email);


            };
            window["log"] = $http;
            $scope.signInCall = function (user: UserModel.User, successCallback: Function): void {

                $http.post('http://localhost:8080/users/login?email=higgs@lhc.com&password=1234').success(function () {
                    successCallback();
                });
            }

=======
                console.log(user.email);
                console.log(user.password);
                $http.post('http://localhost:3000/api/users/login', user).success(function (data) {
                    console.log(data);
                });

            };
                
>>>>>>> controllerTest

        }
    }
<<<<<<< HEAD
}
=======
>>>>>>> controllerTest
}


app.controllers.controller('Home.Controller', Home.Controller);
