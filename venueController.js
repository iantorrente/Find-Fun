//Use Geocoding API to get the precise ll instead of 'near' so that users can put in addresses

let map;
let service;
let infowindow;

function getLocations(lat, lng, searchRadius, filter) {
  const location = new google.maps.LatLng(lat, lng);
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15
  });
  
  let request = {
    location: location,
    radius: searchRadius,
    type: [filter]
  }

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, processLocations);
  getCurrentWeather(lat, lng);

}

function processLocations(results, status) {
  console.log("Inside of processLocations()");
  console.log(results[0]);
  clearResultsList();
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      getDetailedLocation(results[i]);
    }
  }
}

function getDetailedLocation(location) {
  console.log("Inside of getDetailedLocation()");
  
  const locationCoord = new google.maps.LatLng(location.geometry.location.lat(), location.geometry.location.lng());
  map = new google.maps.Map(document.getElementById('map'), {
    center: locationCoord,
    zoom: 15
  });
  
  let request = {
    placeId: location.place_id
  }

  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, processDetailedLocation);
}

function processDetailedLocation(place, status) {
  console.log("Inside of processDetailedLocation()");
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    displayResult(place);
  }
}

function clearResultsList() {
  $('#results-list').empty();
  $('#search-results').removeClass('hidden');
}

function displayResult(place) {
  console.log(place);
  $('#results-list').append(
    `<li class=result-item>
      <span class=item-name><h3>${place.name}</h3></span>
      <span class=item-rating><p>${place.rating}</p></span>
      <p class="item-address"><i>${place.formatted_address}</i></p>
      <p>${place.international_phone_number}</p>
    </li>`
  )
}
