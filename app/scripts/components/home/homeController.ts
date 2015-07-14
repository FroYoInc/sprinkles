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
                $http.post('http://localhost:3000/api/users/login', user).success(function (data) {
                    console.log(data);
                });

            };
                

        }
    }
}


app.controllers.controller('Home.Controller', Home.Controller);
