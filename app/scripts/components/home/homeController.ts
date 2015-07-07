/// <reference path="../../app.ts"/>

interface IMyMessage
{
  title: string;
}
 
interface IMyScope extends ng.IScope
{
  message: IMyMessage;
  events: any;
}

class homeController {

  constructor( $scope: IMyScope )
  {
    $scope.events  = this;
    $scope.message = { title: "Hello World!!" };
  }
 
  clickMe()
  {
    console.log("Test");
  }

}

app.controllers.controller('homeController', homeController);
