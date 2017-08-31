function initMap() {
	console.log('google maps up')

	var styledMap = [{
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]},{
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]},{
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]},{
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]},{
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]},{
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]},{
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]},{
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]}]

	var map;

	var markers = [];

	var houseIcon = 'icon.png';

	var infowindow = new google.maps.InfoWindow;

	var locations = [
	          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
	          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
	          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
	          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
	          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
	          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
	        ];

	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.719526, lng: -74.0089934}, 
		zoom: 13,
		styles: styledMap
	})

	function getMarkers() {
		$.each(locations, function(index, location) {
			var eachLocation = location.location;
			var eachTitle = location.title;

			var marker = new google.maps.Marker({
				position: eachLocation,
				coords: eachLocation, 
				map: map, 
				title: eachTitle,
				animation: google.maps.Animation.DROP,
				icon: houseIcon
			})

			markers.push(marker)

			marker.addListener('click', function() {
				createThatInfoWindow(this, infowindow)
			})

		})
	}

	//loops through locations array, and spits out a marker for each location. Added animation and custom icons
	getMarkers();


	function createThatInfoWindow(marker, infowindow) {
		console.log('1', marker)
		console.log('2', infowindow)
		var contentSection = ('<h4>' + marker.title + '</h4><p>' + marker.coords.lat + marker.coords.lng + '</p>');
		$('#locationName').text(marker.title)

		var streetViewService = new google.maps.StreetViewService();

		function getTheStreetView(data, status) {
			if (status === 'OK') {
				var nearestPano = data.location.pano;

				var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'))

				panorama.setPano(nearestPano)
				panorama.setPov({
					heading: 270, 
					pitch: 0
				});

				console.log('3', data)
				console.log('4', status)
			}
		}

		infowindow.setContent(contentSection)
		infowindow.open(map, marker)

		//this is what does it. It gets the location of the marker and searches for anything within a 50m radius, then it performs the getTheStreetView function, which, if ok, get the coords of the nearest pano image, initiates a new StreetViewPanorama class and set it in the id location. Then we just set it!
		streetViewService.getPanoramaByLocation(marker.position, 50, getTheStreetView)

		// var pano = new google.maps.StreetViewPanorama();

		// streetViewService.getPanorama(marker.position)


	}




}