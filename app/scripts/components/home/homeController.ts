/// <reference path="../../app.ts"/>
/// <reference path='usermodel.ts' />
import angular = require('angular.d.ts');

// interface used to get a get user from their email and password during sign inmodule SignIn{
module Home {

    /*
    export interface HttpPromise {
        success(callback: Function) : HttpPromise;
        error(callback: Function) : HttpPromise;
    }
    export interface Http {
        get(url: string): HttpPromise;
        post(url: string, data: any): HttpPromise;
        delete(url: string): HttpPromise;
    }
    */

    export interface Scope {
        newUserEmail: string;
        newUserPass: string;
        signIn: Function;
    }
    export class Controller {
        
        private httpService: any;

        constructor ($scope: Scope, $http: any) {
            this.httpService = $http;
            
            // populate the data when sign in is clicked
            $scope.signIn = function () {
                var testUser    = new UserModel.User();
                testUser.Email  = $scope.newUserEmail;
                testUser.Pass   = $scope.newUserPass;

                console.log(testUser.Email);

            };
            
            signInCall(user: UserModel.User, successCallback: Function): void {
                this.httpService.post("http://localhost:8080/users/login?email=", 
                    '"higgs@lhc.com"&password="1234"').success(function () {
                    successCallback();
                });
            
            }


    }
}
    // Link to use for first test
    // http://localhost:8080/users/login?email="higgs@lhc.com"&password="1234"


app.controllers.controller('Home.Controller', Home.Controller);
