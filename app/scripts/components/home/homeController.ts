/// <reference path="../../app.ts"/>
/// <reference path='usermodel.ts' />
/// <reference path="../services/databaseService.ts"/>

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
        newUserPassword: string;
        signIn: Function;
        signInCall: Function;
    }
    export class Controller {
        
        private httpService: any;
        private httpPromise: any;

        constructor ($scope: Scope, $http: any) {

            this.httpService = $http;

            //this.httpPromise = new DBServices.HttpPromise();
            
            // populate the data when sign in is clicked
            $scope.signIn = function () {
                var user    = new UserModel.User();
                user.email  = $scope.newUserEmail;
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
    // Link to use for first test
    // http://localhost:8080/users/login?email="higgs@lhc.com"&password="1234"


app.controllers.controller('Home.Controller', Home.Controller);
