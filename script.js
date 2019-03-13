'use strict'

const fourSquareURL = "https://api.foursquare.com/v2/venues/search";
const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json";

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

//Use Geocoding API to get the precise ll instead of 'near' so that users can put in addresses
function getLocations(location, searchRadius, filter) {
  const params = {
    ll: location,
    radius: searchRadius,
    categoryId: filter,
    intent: "browse",
    v: "20190312",
    client_id: "YXK35O54A4IW0DZVKININB4DRIF02JEOHEY1D4FEA5MINXJM",
    client_secret: "SYHY2JUGNKRI3422455J1MFXU0J4A51RZYNT3A3SBYCEBIWP",
  }

  const queryString = formatQueryParams(params);
  const url = fourSquareURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      alert("Something went wrong: " + err);
    })
}

function displayResults(responseJson) {
  $('#results-list').empty();
  console.log(responseJson.response.venues);

  for (let i = 0; i < responseJson.response.venues.length; i++) {
    $('#results-list').append(
      `<li>
        <h3>${responseJson.response.venues[i].name}</h3>
        <p>Address: ${responseJson.response.venues[i].location.address}, ${responseJson.response.venues[i].location.postalCode}, ${responseJson.response.venues[i].location.city}, ${responseJson.response.venues[i].location.state}</p>
      </li>`
    )
  }

  $('#search-results').removeClass('hidden');
}

function milesToMeters(miles) {
  return miles * 1609.344;
}

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
      console.log("Geocode: " + ll);
      getLocations(ll, searchRadius, filter);
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
