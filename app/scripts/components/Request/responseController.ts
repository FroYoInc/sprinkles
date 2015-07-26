/// <reference path="../../app.ts"/>

// interface used to sign up a user
module Response {

  export interface Scope {
    loadRequestView: Function;
    users:any;
    emptyUsers:any;
    addUser:Function;
    name:string;
    name2:string;
    name3:string;

  }
  export class Controller {

    constructor($scope:Scope, $location) {

      $scope.users = [{'name':'Lou','name2':'Saechao','name3':'alou'},
        {'name':'Justin','name2':'Shuck','name3':'jshuck'},
        {'name':'Dominic','name2':'Shrya','name3':'dshrya'}];

      $scope.emptyUsers = [];


      $scope.addUser = function(){
        $scope.emptyUsers.push({'name':$scope.name,'name2':$scope.name2,'name3':$scope.name3})
      };


      $scope.loadRequestView = function() {
        $location.url('/ApproveDeny');
      };
    }

  }
}

app.controllers.controller('Response.Controller', Response.Controller);
