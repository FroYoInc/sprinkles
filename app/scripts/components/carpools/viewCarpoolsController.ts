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
    }
    export class Controller {

    	constructor ($scope: Scope, $http: any, $location: any, ConfigService: any, $controller:any) {
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
                $scope.map.setCenter(myloc);
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
              zoom: 11,
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
              
              var carpoolParticipants = "";
              carpool.participants.map( (participant, index) => {
                carpoolParticipants += participant.firstName + " " + participant.lastName;
                if(index !== carpool.participants.length - 1){
                  carpoolParticipants += ", "
                }
              });

              contentString += "<p><strong>Participants:  </strong>" + carpoolParticipants + "</p>";
              contentString += "<p><strong>Description:   </strong>" + carpool.description + "</p>";
              contentString += "<br>"

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
