/// <reference path="../../app.ts"/>

// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_View {

    export interface Scope {
        carpoolList: any;
        campusList: any;
        display: Function;
        search: Function;
        $new: Function;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any, ConfigService: any, $controller:any) {
          
          //Populate campus list
          $http.get(ConfigService.host + ConfigService.port + '/api/campuses').success(function(data, status, headers, config) {
            $scope.campusList = data;
          });

          $scope.search = (campus, radius, address) => {
            var getString = ConfigService.host + ConfigService.port + '/api/carpools?campusName=' + campus;
            if(radius !== undefined && address !== undefined){
              var geoCode = $scope.$new();
              $controller('GeoCoding.Controller',{$scope : geoCode });
              geoCode.geocodeAddress(address, (geo) => {
                if(geo === null){
                  $('#GeoLocationError').css('visibility','visible').fadeIn();
                  return;
                }
                getString += "&radius=" + radius;
                getString += "&long=" + geo.long;
                getString += "&lat=" + geo.lat;
                makeRequest(getString);
              });

            }
            else{
              makeRequest(getString);
            }


          };

          function makeRequest(getString){
            $http.get(getString)
            .success(function(data, status, headers, config) {
              console.log(data);
             $scope.carpoolList = data;
            })
            .error(function(data, status, headers, config) {
              //500 server error
              if(status == 500){
                window.scrollTo(0,0);
                  $('#internalError').css('visibility','visible').fadeIn();
              }
              if(status == 404) {
                window.scrollTo(0,0);
                  $('#notFound').css('visibility','visible').fadeIn();
              }
            });
          }
    	}
    }
}
app.controllers.controller('Dashboard_Carpools_View.Controller', Dashboard_Carpools_View.Controller);
