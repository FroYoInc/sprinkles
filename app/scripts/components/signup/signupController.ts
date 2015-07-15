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

              var postData = {
                userName: $scope.userName,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.userEmail,
                password: $scope.userPass1
              };
              console.log(postData);
                $http.post('http://localhost:3000/api/users', postData).success(function(data, status, headers, config) {
                  console.log(data);
                }).error(function(data, status, headers, config) {
                  console.log('error');
                  console.log(data);
                });
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
