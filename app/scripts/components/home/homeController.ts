/// <reference path="../../app.ts"/>

// interface used to get a get user from their email and password during sign inmodule SignIn{
module Home {

    export interface Scope {
        newUserEmail: string;
        newUserPass: string;
        signIn: Function;
    }
    export class Controller {

        constructor ($scope: Scope) {

            // populate the data when sign in is clicked
            $scope.signIn = function () {
                var testUser    = new UserModel.User();
                testUser.Email  = $scope.newUserEmail;
                testUser.Pass   = $scope.newUserPass;

                console.log(testUser.Email);
                console.log(testUser.Pass);
            };
        }

    }
}
    // Link to use for first test
    // http://localhost:8080/users/login?email="higgs@lhc.com"&password="1234"


app.controllers.controller('Home.Controller', Home.Controller);
