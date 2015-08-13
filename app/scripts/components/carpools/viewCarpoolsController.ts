/// <reference path="../../app.ts"/>
/// <reference path="../../../../typings/googlemaps/google.maps.d.ts"/>
// interface used to display a list of carpools, edit user profile and create a carpool
module Dashboard_Carpools_View {

    export interface Scope {
        carpoolList: any;
        campusList: any;
        display: Function;
        search: Function;
        $new: Function;
        initialize: Function;
        updateMap: Function;
        map: any;
        markers: Array<google.maps.Marker>;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any, ConfigService: any, $controller:any) {
          $scope.markers = [];
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
             $scope.updateMap(data);
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

          $scope.initialize = (mapid: string) => {

            var myloc = new google.maps.LatLng(45.5112894,-122.6835567);

            var mapOptions = {
              center: myloc,
              zoom: 11,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById(mapid),mapOptions);

            var marker=new google.maps.Marker({
              position: new google.maps.LatLng(45.5112894,-122.6835567)
            });
            $scope.markers.push(marker);
            marker.setMap($scope.map);
          };

          $scope.updateMap = (carpools:any) => {
            
            // Clears all of the previous markers from the map
            $scope.markers.map( (marker) => {
              marker.setMap(null);
            });

            // Create all of the new markers and bind events to them
            // Then place them on the map
            carpools.map( (carpool) =>{
              
              var geo = carpool.pickupLocation.geoCode;
              
              var marker = new google.maps.Marker({
                position: new google.maps.LatLng(geo.lat,geo.long)
              });

              var iw = new google.maps.InfoWindow({
                              content: "Carpool: " + carpool.name
              });

              google.maps.event.addListener(marker, 'click', function () {
                  iw.open($scope.map, marker);
              });

              $scope.markers.push(marker);
              marker.setMap($scope.map);
            });


          }
    	}
    }
}
app.controllers.controller('Dashboard_Carpools_View.Controller', Dashboard_Carpools_View.Controller);
