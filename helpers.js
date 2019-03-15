//Helper functions
function milesToMeters(miles) {
  return miles * 1609.344;
}

function kelvinToFahrenheit(kelvin) {
  let fahrenheit = Math.round((kelvin - 273.15) * 9/5 + 32);
  return fahrenheit;
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
