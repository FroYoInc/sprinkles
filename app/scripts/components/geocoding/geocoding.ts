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
                    var geo = data.results[0].geometry.location;
                    var Geo:GeoCode = {
                        long : geo.lng,
                        lat: geo.lat
                    };
                    cb(Geo);
                  })
                  .error((data, status) => {
                    cb(null);
                  });
            }
        };

    };

};
app.controllers.controller('GeoCoding.Controller', GeoCoding.Controller);


