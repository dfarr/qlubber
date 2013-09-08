'use strict';

/* Directives */

var qlubberDirectives = angular.module('qlubberDirectives', []);

qlubberDirectives.directive('map', function () {


		return {

			restrict: 'E',
			template:  '<div id="Map"></div>' +
					    '<div class="DetailLayer"></div>' +
					    '<div class="RateLayer"></div>' +
					    '<div class="Location"><img src="img/location.png"></div>' +
					    '<div class="Rate"><img src="img/rate.png"></div>',

			scope: {
				places: "="
			},

			link: function(scope, elem, attrs) {

				var mapOptions = {
			        center: new google.maps.LatLng(37.7749295,-122.4194155),
			        zoom: 13,
			        mapTypeId: google.maps.MapTypeId.ROADMAP
			    };
			    var map = new google.maps.Map(elem[0].children[0], mapOptions);

			    // when we have the places, populate the map
				scope.$watch('places', function(places) {
					if(scope.places) {

						var Markers = [];
					    for (var x = 0;x<scope.places.length;x++) {
					        // CUSTOM ICON
					        var marker = new google.maps.Marker({
					            position: new google.maps.LatLng(scope.places[x].pos.lat,scope.places[x].pos.lon),
					            map: map,
					            icon: 'img/icon.png'
					        });

					        Markers.push(marker);    					}

    					// Events(Markers);

    					for (var x = 0;x<Markers.length;x++) {

						    google.maps.event.addListener(Markers[x], 'click', function() {
						        //map.setZoom(15);
						        //map.setCenter(Markers[x].getPosition());

						        console.log(marker);


						        $('#Phone').find('.DetailLayer').animate({top:'85%'},200,function(){

						            $.ajax({
						                type: "POST",
						                url: "map/" + marker.data.id,
						                success: function(content)
						                {
						                    $('#Phone').find('.DetailLayer').html(content)
						                    console.log('Data Received');
						                }
						            });
						        });
						    });
						}


						// SWITCH TOM MY LOC
						$('#Phone').find('.Location').click(function(){

						    if (navigator.geolocation) {
						        navigator.geolocation.getCurrentPosition(function (position) {
						            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						            map.setCenter(initialLocation);
						        });
						    }
						    console.log(map);
						})

						$('#Map').click(function(){

						    $('#Phone').find('.Search').css('top','-60px');
						})

						$('#Phone').find('.Rate').click(function(){

						    $('#Phone').find('.RateLayer').css('left','0px');
						})


						Hammer('body').on("swipeup", function(e) {
						    //alert('you swiped left!');
						      console.log(e.pageY);
						    $('.DetailLayer').css('top','0px');
						    e.preventDefault()
						});


						Hammer('body').on("swipedown", function(e) {

						    $('.DetailLayer').css('top','100%');
						    e.preventDefault()

						});

					}
				}, true);
			}

		}


	}
);

function Events (Markers)
{
    // ENABLE DETAIL
   for (var x = 0;x<Markers.length;x++)
    {
    google.maps.event.addListener(Markers[x], 'click', function() {
        map.setZoom(15);
        map.setCenter(marker.getPosition());


        $('#Phone').find('.DetailLayer').animate({top:'85%'},200,function(){

            $.ajax({
                type: "POST",
                url: "map/" + places.id,
                data: {ID:x},
                success: function(content)
                {
                    $('#Phone').find('.DetailLayer').html(content)
                    console.log('Data Received');
                }
            });
        });
    });
    }


    // SWITCH TOM MY LOC
    $('#Phone').find('.Location').click(function(){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(initialLocation);
            });
        }
        console.log(map);
    })

    $('#Map').click(function(){

        $('#Phone').find('.Search').css('top','-60px');
    })

    $('#Phone').find('.Rate').click(function(){

        $('#Phone').find('.RateLayer').css('left','0px');
    })


    Hammer('body').on("swipeup", function(e) {
        //alert('you swiped left!');
          console.log(e.pageY);
        $('.DetailLayer').css('top','0px');
        e.preventDefault()
    });


    Hammer('body').on("swipedown", function(e) {

        $('.DetailLayer').css('top','100%');
        e.preventDefault()

    });


    /*
    $('DetailLayer').on( "swipeup", page, function() {
       // $.mobile.changePage( prev + ".html", { transition: "slide", reverse: true } );
    });*/

}