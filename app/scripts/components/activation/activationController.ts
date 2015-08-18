/// <reference path="../../app.ts"/>

module Activation {

    export interface Scope {
      validActivation: Function;
      invalidActivation: Function;
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

        constructor ($scope: Scope, $location, $http: any, $cookies: any,ConfigService: any) {
          
          $scope.validActivation = () => {
            showAlert('#accountActicated');
            $location.path("/home");
          }

          $scope.invalidActivation = () => {
            showAlert('#activationFailure');
            $location.path("/home");
          }
        }

    }

}

app.controllers.controller('Activation.Controller', Activation.Controller);