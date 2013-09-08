'use strict';

/* Controllers */

function MapCtrl($scope, Places) {
	$scope.places = Places.query();
}

function MapDetailCtrl($scope, $routeParams, Places) {
  $scope.place = Places.get({id: $routeParams.id}, function(place) {
    $scope.place = place;
  });
}
