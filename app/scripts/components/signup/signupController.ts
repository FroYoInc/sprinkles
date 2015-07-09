/// <reference path="../../app.ts"/>

// interface used to get a get user from their email and password during sign inmodule SignIn{
module Signup {

    export interface Scope {
        userEmail: string;
        userPass1: string;
        userPass2: string;
        userName: string;
        firstName: string;
        lastName: string;
        events: any;
        signupUser: Function;
        checkPasswords: Function;
    }
    export class Controller {

        constructor ($scope: Scope) {
            $scope.events = this;
            // populate the data when sign in is clicked
            $scope.signupUser = function () {
              $scope.checkPasswords();
                console.log("hi " + $scope.firstName);
            };

            $scope.checkPasswords = function() {
              if($scope.userPass1.localeCompare($scope.userPass2) == 0) {
                console.log("Passwords Match!S")
              }
              //console.log($scope.userPass1 + "/" + $scope.userPass2)

            }
        }

    }
}
    // Link to use for first test
    // http://localhost:8080/users/login?email="higgs@lhc.com"&password="1234"


app.controllers.controller('Signup.Controller', Signup.Controller);
