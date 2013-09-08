'use strict';

/* App Module */

angular.module('qlubber', ['qlubberFilters', 'qlubberServices', 'qlubberDirectives']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/map', {templateUrl: 'partials/map.html',   controller: MapCtrl}).
      when('/map/:id', {templateUrl: 'partials/map-details.html', controller: MapDetailCtrl}).
      otherwise({redirectTo: '/map'});
}]);
