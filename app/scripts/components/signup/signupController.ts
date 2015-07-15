/// <reference path="../../app.ts"/>

// interface used to get a get user from their email and password during sign inmodule SignIn{
module Signup {

    export interface Scope extends ng.IScope {
        userEmail: string;
        userPass1: string;
        userPass2: string;
        userName: string;
        firstName: string;
        lastName: string;
        events: any;
        signupUser: Function;
        checkPasswords: Function;
        signup: Function;
        navClass: Function;
        loadSignup: Function;

        $apply: any;
        $watch: any;
        $parent: any;
        $emit: any;
    }
    export class Controller {

        constructor ($scope: Scope, $location, $http: any) {
            $scope.events = this;
            console.log($scope);

            // populate the data when sign in is clickeds
            $scope.signupUser = function () {

                //$http.post('localhost:8080/')
            };

            $scope.loadSignup = function (userEmail, firstName, lastName) {
                  $location.url('/signup');
             };
        }

    }
}
    // Link to use for first test
    // http://localhost:8080/users/login?email="higgs@lhc.com"&password="1234"


app.controllers.controller('Signup.Controller', Signup.Controller);
