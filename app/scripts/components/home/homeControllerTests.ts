/// <reference path="../../app.ts"/>

// This is a file that shows the process of elmination I went through to get the scope to work properly. It may be helpful to look at what I tried in order to save time trying to do that same thing.

// It appears that if any data is tried to get passed into the construtor none of the home view will load. Therefor trying to create a fake user in the construcot method seemes to not be a solution to this problem.

//None of this code will work but if you uncomment
            // $scope.testUser.Email = "t@test.com"
            // and comment out the
            // newUser.Email = "test@test.com";
            // this.testUser.Email = newUser.Email;
// you will notice the same error of the componets not loading

interface User {
    Email: string;
    Pass: string; //Password is a reserved word
}

interface Scope {
  events: any;
}
class homeController { //removed ng.Scope and still worked

    testUser: User;

    // if any fake user creation is done during the cunstructors main block none of the home page will load propperly
    //There for this proccess also does not work


    // newUser: User is passed into the constructer so when we call the constructer we can create a user, but idk how to pass in the scope on the new homeController call
    constructor ($scope: Scope, newUser: User) {
        $scope.events = this; //is needed in order to connect the controller and the view
        // create a fake user for testing purposes
        // $scope.testUser.Email = "t@test.com" // doesn't work. This will make the componets of the home view never load
        newUser.Email = "test@test.com";
        this.testUser.Email = newUser.Email;
        }

        clickMe () {
             console.log("here")
            console.log(this.testUser.Email); // if you uncomment $scope.testUser.Email = "t@test.com" you will need to change the log
        }

        signup() {
          console.log("here")
         console.log(this.testUser.Email);
        }
    }


app.controllers.controller('homeController', homeController);
