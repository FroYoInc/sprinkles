/// <reference path="../../app.ts"/>

// interface used to sign up a user
module Signup {

    export interface Scope {
        userEmail: string;
        userPass1: string;
        userPass2: string;
        userName: string;
        firstName: string;
        lastName: string;

        events: any;
        usernameerror: boolean;
        emailExistsError: boolean;
        emailDomainError: boolean;
        userpassError: boolean;
        invalidEmailError: boolean;

        signupUser: Function;
        checkPasswords: Function;
        signup: Function;
        loadSignup: Function;
    }
    export class Controller {

        constructor ($scope: Scope, $location: any, $http: any, $localStorage, ConfigService: any) {
            $scope.events = this;
            //Adds the information into a temp local storage.
            //This gets cleared after the user signs up.
            $scope.userEmail = $localStorage.email;
            $scope.firstName = $localStorage.fname;
            $scope.lastName = $localStorage.lname;

            //Helper function that hides error messages
            var resetErrors = () => {
              $scope.usernameerror = false;
              $scope.emailExistsError = false;
              $scope.emailDomainError = false;
              $scope.userpassError = false;
              $scope.invalidEmailError = false;
            }
            resetErrors();

            // Posts the user data
            $scope.signupUser = (res) => {
              //If theres an error in the form return OR if the passwords dont match
              if(res || $scope.userPass1.localeCompare($scope.userPass2) != 0){
                return;
              }
              //Set the post data before we make the call
              var postData = {
                userName: $scope.userName,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.userEmail,
                password: $scope.userPass1
              };

              resetErrors();
              $http.post(ConfigService.host + ConfigService.port +'/api/users', postData).success(function(data, status, headers, config) {
                  //clear the localstorage
                  $localStorage.$reset();
                  $('#accountmade').css('visibility','visible').fadeIn();
                  //re-route and have popup show
                  $location.path('home');

                }).error(function(data, status, headers, config) {
                  //Email exists
                  if(status == 409 && ((data.message).localeCompare("EmailExistException: email already exist") == 0)){
                      $scope.emailExistsError = true;
                  }
                  //Bad email domain
                  if(status == 400 && ((data.message).localeCompare("EmailValidationException: The email address's domain is not allowed") == 0)){
                      $scope.emailDomainError = true;
                  }
                  //invalid email address
                  if(status == 400 && ((data.message).localeCompare("EmailValidationException: The email address is invalid.") == 0)){
                      $scope.invalidEmailError = true;
                  }
                  //username exists
                  else if( status == 409 && ((data.message).localeCompare("UserExistException: user already exist") == 0)){
                      $scope.usernameerror = true;
                  }
                  //no password or username entered
                  else if( status == 500 && data.message.includes("BcryptHashError")){
                      $scope.userpassError = true;
                  }

                });
            };

            // Loads the signup page
            $scope.loadSignup = (userEmail, firstName, lastName) => {
              //Sets the local storage from the re-routed source
              $localStorage.email = userEmail;
              $localStorage.fname = firstName;
              $localStorage.lname = lastName;
              $location.path('/signup');
             };
        }

    }
}

app.controllers.controller('Signup.Controller', Signup.Controller);
