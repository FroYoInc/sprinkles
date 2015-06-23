/// <reference path="../../app.ts"/>

class homeController {

    message = "Some Message";
    progress = 0;

    constructor($scope) {
        $scope.vm = this;
    }
}

app.controllers.controller('homeController', homeController);
