/// <reference path="../../app.ts"/>

// interface used to sign up a user
module Admin {

    export interface Scope {

    }
    export class Controller {

        constructor ($scope: Scope, $location, $http: any, $localStorage, ConfigService: any) {

        }

    }
}

app.controllers.controller('Admin.Controller', Admin.Controller);