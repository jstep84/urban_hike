<script>
	(function () {
		google.load("maps", "2");
		google.setOnLoadCallback(function () {
			// Create map
			var map = new google.maps.Map2(document.getElementById("map")),
				markOutLocation = function (lat, long) {
					var latLong = new google.maps.LatLng(lat, long),
					marker = new google.maps.Marker(latLong);
					map.setCenter(latLong, 15);
					map.addOverlay(marker);
				};
				map.setUIToDefault();

			// Check for geolocation support	
			if (navigator.geolocation) {
				// Get current position
				navigator.geolocation.getCurrentPosition(function (position) {
						// Success!
						markOutLocation(position.coords.latitude, position.coords.longitude);
						console.log('Found you!');
					}, 
					function () {
						markOutLocation(59.3325215, 18.0643818);
					}
				);
			}
			else {
				markOutLocation(-27.121192, -109.366424);
			}
		});	
	})();
</script>