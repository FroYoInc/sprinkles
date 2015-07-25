/// <reference path="../../app.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_Create {

    export interface Scope {
        name: string;
        campus: string;
        description: string;
        owner: string;
        campusList: any;
        userNotFound: Boolean;
        carpoolExists: Boolean;
        createCarpool: Function;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any) {
        //Populate campus list
        $http.get('http://localhost:3000/api/campuses').success(function(data, status, headers, config) {
          $scope.campusList = data;
          });

        $scope.createCarpool = (isInvalidForm) => {
          var postData = {
            name: $scope.name,
            description: $scope.description,
            campus: $scope.campus,
            owner: $scope.owner
          }
          
          //Hide previous errors:
          $scope.userNotFound = false;
          $scope.carpoolExists = false;

          //If the form is invalid, don't make the request
          if(isInvalidForm) {
            return;
          }

          //Attempt to post data
          $http.post('http://localhost:3000/api/carpools', postData).success(function(data, status, headers, config) {
              $location.path('/dashboard');
              window.scrollTo(0,0);
              $('#carpoolCreated').css('visibility','visible').fadeIn();
            }).error(function(data, status, headers, config) {
              //406: Owner not found
              if(status == 406 && ((data.message).localeCompare("CarpoolOwnerNotFoundException: carpool owner user not found") == 0)){
                  $scope.userNotFound = true;
              }
              //409: Carpool already Exists
              if(status == 409){
                $scope.carpoolExists = true;
              }
              //500: Server error
              if(status == 500){
                window.scrollTo(0,0);
                  $('#internalError').css('visibility','visible').fadeIn();
              }
            });
        }
    	}
    }
}
app.controllers.controller('Dashboard_Carpools_Create.Controller', Dashboard_Carpools_Create.Controller);
