module GeoCoding {

    export interface Scope {
        geocodeAddress: Function;
    };

    export interface GeoCode{
        long: number;
        lat: number;  
    }
    export class Controller {
        constructor($scope: Scope, $location, $http: any, $cookies: any, ConfigService: any){
            
            $scope.geocodeAddress = (address, cb: (success:GeoCode) => void) => {
                $http.get( ConfigService.mapsApi + address + '&key=' + ConfigService.key)
                  .success( (data) => {

                    var Geo:GeoCode = null;
                    if(data.results[0] !== undefined){
                      var geo = data.results[0].geometry.location;
                      Geo = {
                          long: geo.lng,
                          lat: geo.lat
                      };
                    }
                    if(Geo === null){
                      $('#GeoLocationError').css('visibility','visible').fadeIn();
                    }
                    cb(Geo);

                  })
                  .error((data, status) => {
                    $('#GeoLocationError').css('visibility','visible').fadeIn();
                    cb(null);
                  })
            }
        }

    }

};
app.controllers.controller('GeoCoding.Controller', GeoCoding.Controller);


