/// <reference path="../../app.ts"/>

module Admin {

    export interface Scope {
      campusName: string;
      campusAddress:string;
      checkAdmin: Function;
      createCampus: Function;
      $new:Function;
      campusForm: any;
      submitted: boolean;
      isAdmin: boolean;
    };

    export interface GeoCode{
        long: number;
        lat: number;  
    };

    export interface Campus {
      name: string;
      address :{
        address: string;
        geoCode : GeoCode;
      }
    }

    export class Controller {

        constructor ($scope: Scope, $location, $http: any, $cookies: any, $controller:any,ConfigService: any) {
          
          $scope.checkAdmin = ( user, cb: () => void ) => {
              $http.get(ConfigService.host + ConfigService.port + '/api/users/checkadmin')
                .success( (data) => {
                  user.updateAdmin(true);
                  cb();
                })
                .error( (data, status) => {
                  user.updateAdmin(false);
                  cb();
                });

          };


          $scope.createCampus = (isInvalidForm) => {
            // Set the form submitted to true
            $scope.submitted = true;
            
            // If the form is not valid return.
            if(isInvalidForm){
              return;
            }

            // Load the GeoCoding.Controller using the injected $controller object
            var geoCode = $scope.$new();
            $controller('GeoCoding.Controller',{$scope : geoCode });

            // Geocode the provided address
            geoCode.geocodeAddress($scope.campusAddress, (geo) => {
              
              // Check that the geocoding function was able to locate the address
              if(geo === null){
                return;
              }

              var campus:Campus = {
                name:$scope.campusName,
                address:{
                  address: $scope.campusAddress,
                  geoCode: geo
                }
              };

              makeRequest(campus);

            });

            function makeRequest(campus){
            // Send the post to the create campus route and handle any error statuses
            $http.post(ConfigService.host + ConfigService.port + '/api/campuses', campus)
              .success( (data) => {
                $('#campusCreated').css('visibility','visible').fadeIn();
                // Reset the form
                $scope.campusName = "";
                $scope.campusAddress = "";
                $scope.submitted = false;
              })
              .error( (data, status) => {
                switch(status){
                  case 400:
                    $('#badRequest').css('visibility','visible').fadeIn();
                    break;
                  case 403:
                    $('#notAdmin').css('visibility','visible').fadeIn();
                  case 409:
                    $('#campusConflict').css('visibility','visible').fadeIn();
                    break;
                  case 500:
                    $('#internalError').css('visibility','visible').fadeIn();
                    break;
                }
              });
            }


          };

        }

    };
};

app.controllers.controller('Admin.Controller', Admin.Controller);
