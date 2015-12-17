var initMap = function() {
	var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6097, lng: 122.3331},
    zoom: 15
  });
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var initialLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(initialLoc);

			markers.forEach(function(marker) {
				var latLng = new google.maps.LatLng(marker.lat, marker.lng);
				var googleMarker = new google.maps.Marker({
					position: latLng,
					map: map,
					title: marker.name
				});
			});
		});
	}
}