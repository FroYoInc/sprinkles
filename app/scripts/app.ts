/// <reference path='..\libs\angular\angular.d.ts' />
/// <reference path='..\libs\jquery\jquery.d.ts' />

/// <reference path='components/home/homeController.ts' />
/// <reference path='components/signup/signupController.ts' />


/**
  *
  * Main app module
  * @type {angular.Module}
  */

  module sprinkles {
  'use strict';
 var app = angular.module('app', [])
    .controller('HomeCtrl', HomeCtrl)
    //.controller('SignupCtrl', SignupCtrl)
}
