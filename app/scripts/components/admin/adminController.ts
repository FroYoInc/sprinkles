/// <reference path="../../app.ts"/>


module Admin {

    export interface Scope {
      campusName: string;
      campusAddress:string;
      checkAdmin: Function;
      createCampus: Function;
      $new:Function;
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

        constructor ($scope: Scope, $location, $http: any, $cookies: any, $controller:any, ConfigService: any) {
          $scope.checkAdmin = () => {
            $http.get(ConfigService.host + ConfigService.port + '/api/users/checkadmin/')
              .success( (data) => {
                setUserAdminStatus(true);
              })
              .error( (data, status) => {
                console.log(status);
                setUserAdminStatus(false);
              });
              function setUserAdminStatus(status){
                var user = $cookies.getObject('user');
                user.isAdmin = status;
                $cookies.put('user', user);
              }
          };


          $scope.createCampus = (isInvalidForm) => {
            if(isInvalidForm){
              return;
            }

            var geoCode = $scope.$new();
            $controller('GeoCoding.Controller',{$scope : geoCode });
            geoCode.geocodeAddress($scope.campusAddress, (geo) => {
              
              if(geo === null){
                $('#GeoLocationError').css('visibility','visible').fadeIn();
                return;
              }

              var campus:Campus = {
                name:$scope.campusName,
                address:{
                  address: $scope.campusAddress,
                  geoCode: geo
                }
              };

              $http.post(ConfigService.host + ConfigService.port + '/api/campuses', campus)
                .success( (data) => {
                  $('#campusCreated').css('visibility','visible').fadeIn();
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

            });



          };

        }

    };
};

app.controllers.controller('Admin.Controller', Admin.Controller);
