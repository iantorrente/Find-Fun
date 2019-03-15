'use strict'

const googlePlacesNearbyURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json";
const weatherURL = "https://api.openweathermap.org/data/2.5/forecast";
const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather";

function getGeocode(location, searchRadius, filter) {
  const params = {
    address: location,
    key: "AIzaSyCSyr3aKLcpQ_TNj8fzQp4TOyzzzO9dTi0"
  }

  const queryString = formatQueryParams(params);
  const url = geocodeURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      let lat = responseJson.results[0].geometry.location.lat;
      let lng = responseJson.results[0].geometry.location.lng;
      let ll = `${lat},${lng}`;
      //getCurrentWeather(lat, lng); //weatherController.js
      getLocations(lat, lng, searchRadius, filter); //venueController.js
    })
    .catch(err => {
      alert("Something went wrong trying to retrieve the geocode: " + err);
    })
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const location = $('#location-search').val();
    const searchRadius = milesToMeters($('#search-radius').val());
    const filter = $('#location-filter').val();
    getGeocode(location, searchRadius, filter);
    console.log("Submit fired with a location of: " + location + "\nradius of: " + searchRadius + "\nfilter of: " + filter);
  })
}

$(watchForm);
