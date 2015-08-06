/// <reference path="../../app.ts"/>


module Admin {

    export interface Scope {
      checkAdmin: Function;
      createCampus: Function;
      $new:Function;
    };

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


          $scope.createCampus = (campus) => {
            var testCampus = {
              name: "Some random campus",
              address: {
                address: "875 N cedar ct Canby, OR",
                geoCode: {
                  long: 0,
                  lat: 0
                }
              }
            };
            var geoCode = $scope.$new();
            $controller('GeoCoding.Controller',{$scope : geoCode });
            geoCode.geocodeAddress(testCampus.address.address, (geo) => {
              console.log(geo);

            })


            $http.post(ConfigService.host + ConfigService.port + '/api/campuses', testCampus)
              .success( (data) => {
                $('#success').css('visibility','visible').fadeIn();
              })
              .error( (data, status) => {
                console.log(status);
                switch(status){
                  case 400: 
                    // This should not be happening if the form is validated properly
                    break;
                  case 409:
                    // Show a warning that the campus already exists
                    break;
                  case 500:
                    // Show internal server error messge.
                    break;
                }
              })
          };

        }

    };
};

app.controllers.controller('Admin.Controller', Admin.Controller);
