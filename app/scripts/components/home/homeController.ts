/// <reference path="../../app.ts"/>

class homeController {


    constructor($scope) {
        $scope.vm = this;
    }

}

app.controllers.controller('homeController', homeController);
