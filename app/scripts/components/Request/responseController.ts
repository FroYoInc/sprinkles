/// <reference path="../../app.ts"/>

// interface used to sign up a user
module Response {

  export interface Scope {
    loadRequestView: Function;
    carpoolRequests: Function;
    viewRequests: Function;
    users:any;
    emptyUsers:any;
    addUser:Function;
    name:string;
    name2:string;
    name3:string;

  }
  export class Controller {

    constructor($scope:Scope, $location, $http: any) {

      /* Hard coded data to test in earlier implementation

      $scope.users = [{'name':'Lou','name2':'Saechao','name3':'alou'},
        {'name':'Justin','name2':'Shuck','name3':'jshuck'},
        {'name':'Dominic','name2':'Shrya','name3':'dshrya'}];

      $scope.emptyUsers = [];

      $scope.addUser = function(){
        $scope.emptyUsers.push({'name':$scope.name,'name2':$scope.name2,'name3':$scope.name3})
      };

     */

      $scope.viewRequests = function(){
        $http.get('http://localhost:3000/api/carpools/requests').success(function(data, status, headers, config) {
          $scope.carpoolRequests = data;
          console.log('success!')
        }).error(function(data, status, headers, config){
          if(status == 401){
            console.log('Unauthorized attempt, user must be logged in.');
          }
          else if(status == 404){
            console.log('user not found');
          }
          else if(status == 500){
            console.log('Internal Server error. Unable to make request')
          }
        });
      };




      $scope.loadRequestView = function() {
        $location.url('/ApproveDeny');
      };
    }

  }
}

app.controllers.controller('Response.Controller', Response.Controller);
