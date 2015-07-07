/// <reference path="../../app.ts"/>

// interface used to get a get user from their email and password during sign inmodule SignIn{

interface User {
    Email: string;
    Pass: string; //Password is a reserved word
}

interface Scope {
  events: any;
}
class homeController {
    
    testUser: User;

    // if any fake user creation is done during the cunstructors main block none of the home page will load propperly 
    //There for this proccess also does not work 
    // newUser: User is passed into the constructer so when we call the constructer we can create a user, but idk how to pass in the scope on the new homeController call
    constructor ($scope: Scope, newUser: User) {
        $scope.events = this;
        // create a fake user for testing purposes 
        // $scope.testUser.Email = "t@test.com" // doesn't work so I tried it with a newUser constructer
        newUser.Email = "test@test.com";
        this.testUser.Email = newUser.Email;
        }    

        clickMe () {
            console.log(this.testUser.Email); 
        }
    }
    // $http.get('http://localhost:8080/users/login?email="higgs@lhc.com"&password="1234"'


app.controllers.controller('homeController', homeController);


 /*
        $scope.createTestUser = function () {
            var newUser = new UserModel.User();
            newUser.Email = $scope.newUserEmail;
            newUser.Pass = $scope.newUserPass; //Password is a reserved word
            
        }; */

        /*
        login(product: UserModel.User, successCallback: Function): void {
        this.httpService.post('http://localhost:8080/users/login?email="higgs@lhc.com"&password="1234"', product).success(function () {
            successCallback();
        });
        */