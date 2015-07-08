/// <reference path="../../app.ts"/>

class signupController {

    message = "Some Message";
    progress = 0;

    constructor($scope) {
        $scope.vm = this;
    }
}

app.controllers.controller('signupController', Home.Controller);
