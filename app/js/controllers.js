'use strict';

/* Controllers */

function MapCtrl($scope, Places) {
	$scope.places = Places.query();
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function MapDetailCtrl($scope, $routeParams, Places) {
  $scope.place = Places.get({id: $routeParams.id}, function(place) {
    $scope.place = place;
  });
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
