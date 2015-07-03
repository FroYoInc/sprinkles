/// <reference path="../../app.ts"/>

class homeController {

    message = "Some Message";
    progress = 0;

    constructor($scope) {
        $scope.vm = this;
    }

    function getData($scope, $http) {
    	$http.get('http://localhost:8080/users/login?email="higgs@lhc.com"&password="1234"').success(function(data) {
    		console.log(data);

    	})
    }
    $scope.test() {
    	console.log(message);
    }
}

app.controllers.controller('homeController', homeController);
