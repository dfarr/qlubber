'use strict';

/* Services */

angular.module('qlubberServices', ['ngResource']).
    factory('Places', function($resource){
		return $resource('places/:id.json', {}, {
			query: {method:'GET', params:{id:'places'}, isArray:true}
		});
	});
