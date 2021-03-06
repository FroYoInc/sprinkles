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
        resetForm: Function;
        address: String;
        radius: Number;
        carpoolStatus: Boolean;
        locationMarker: any;
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any, ConfigService: any, $controller:any, $cookies: any) {

        var newCarpool = $cookies.getObject('carpool');
          if (typeof(newCarpool) == "undefined"){
              $scope.carpoolStatus = false;
          } else {
            $scope.carpoolStatus = true;
          }
          $scope.markers = [];
          //Populate campus list
          $http.get(ConfigService.host + ConfigService.port + '/api/campuses').success(function(data, status, headers, config) {
            $scope.campusList = data;
          });

          $scope.resetForm = () => {
            $scope.address = undefined;
            $scope.radius = undefined;
          };

          $scope.search = (campus, radius, address) => {
            $scope.carpoolList = [];
            var getString = ConfigService.host + ConfigService.port + '/api/carpools?campusName=' + campus;

             // Don't continue if one is set but the other is not
             // Or if campus is not defined
            if( (radius !== undefined) !== (address !== undefined) || campus === undefined) {
              return;
            }

            if(radius !== undefined && address !== undefined){
              var geoCode = $scope.$new();
              $controller('GeoCoding.Controller',{$scope : geoCode });
              geoCode.geocodeAddress(address, (geo) => {
                if(geo === null){
                  return;
                }
                getString += "&radius=" + radius;
                getString += "&long=" + geo.long;
                getString += "&lat=" + geo.lat;
                var myloc = new google.maps.LatLng(geo.lat,geo.long);
                makeRequest(getString);

                var image = {
                  url: '../../../images/blue_dot_scaled.png'
                };
                if($scope.locationMarker !== undefined){
                  $scope.locationMarker.setMap(null);                  
                }
                $scope.locationMarker = new google.maps.Marker({
                  position: myloc,
                  icon: image
                });
                $scope.locationMarker.setMap($scope.map);
                $scope.map.setCenter($scope.locationMarker);
              });

            }
            else{
              makeRequest(getString);
            }


          };

          function makeRequest(getString){
            $http.get(getString)
            .success(function(data, status, headers, config) {
             $scope.carpoolList = data;
             $scope.updateMap(data);

            })
            .error(function(data, status, headers, config) {
              //500 server error
              if(status == 500){
                  showAlert('#internalError');
              }
              if(status == 404) {
                  showAlert('#notFound');
              }
            });
          }

          $scope.initialize = (mapid: string) => {

            var myloc = new google.maps.LatLng(45.5112894,-122.6835567);

            var mapOptions = {
              center: myloc,
              zoom: 9,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              disableDefaultUI: true
            };

            $scope.map = new google.maps.Map(document.getElementById(mapid),mapOptions);

          };

          $scope.updateMap = (carpools:any) => {
            
            if(carpools.length){
              var geo = carpools[0].campus.address.geoCode;
              var myloc = new google.maps.LatLng(geo.lat,geo.long);
              $scope.map.setCenter(myloc);
            }
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

              var contentString = '<div class="infoWindow">'
              contentString += '<h3>' + carpool.name + "</h3>";
              
              var carpoolParticipants = "<ul>";
              carpool.participants.map( (participant, index) => {
                carpoolParticipants += "<li>" + participant.firstName + " " + participant.lastName + "</li>";
              });
              carpoolParticipants += "</ul>";

              contentString += "<p><strong>Participants:  </strong>" + carpoolParticipants + "</p>";
              if(carpool.dist >= 0){
                contentString += "<p><strong>Distance:    </strong>" + carpool.dist.toFixed(1) + " miles </p>";
              }
              contentString += "<p><strong>Description:   </strong>" + carpool.description + "</p><br>";
              contentString += "</div>"

              var iw = new google.maps.InfoWindow({
                  content: contentString
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
