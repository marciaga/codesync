//this is where the angular javascripts live
var app = angular
    .module('AngularRails', [
        'ngRoute',
        'templates',
        'ngResource',
        'firebase'  

    ]).config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
              templateUrl: 'home.html',
              controller: 'UserCtrl as user'

          	}).
            when('/room', {
            	templateUrl: 'room.html',
            	controller: 'RoomCtrl'
            });  
             
        $locationProvider.html5Mode(true);
    }). 
config(
    ['$httpProvider', function($httpProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;
    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
}]);