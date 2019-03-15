function getFiveDayWeather(lat, lng) {
  const params = {
    lat: lat,
    lon: lng,
    appid: "f28cfbbd6d26c84d11054159afffeb99"
  }

  const queryString = formatQueryParams(params);
  const url = weatherURL + "?" + queryString;

  console.log(url);

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    displayFiveDayWeather(responseJson);
  })
  .catch(err => {
    alert("Something went wrong trying to retrieve the weather: " + err);
  })
}

function getCurrentWeather(lat, lng) {
  const params = {
    lat: lat,
    lon: lng,
    appid: "f28cfbbd6d26c84d11054159afffeb99"
  }

  const queryString = formatQueryParams(params);
  const url = currentWeatherURL + "?" + queryString;

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    displayCurrentWeather(responseJson);
  })
}

function displayCurrentWeather(responseJson) {
  console.log(responseJson);
  $('#weather-results').empty();
  $('#weather-results').append(
    `<div class=current-weather-result>
      <h2>${responseJson.name}: ${kelvinToFahrenheit(responseJson.main.temp)}&deg; F</h2>
    </div>`
  )

  $('#weather-results').removeClass('hidden');
}

function displayFiveDayWeather(responseJson) {
  console.log(responseJson.list.dt);
  for (let i = 0; i < responseJson.list.length; i++) {
    if (i > 0 && i < 8) {
      console.log("1) " + responseJson.list[i].dt_txt);
      console.log(kelvinToFahrenheit(responseJson.list[i].main.temp))
    } else if (i > 8 && i < 16) {
      console.log("2) " + responseJson.list[i].dt_txt);
      console.log(kelvinToFahrenheit(responseJson.list[i].main.temp))
    } else if (i > 16 && i < 24) {
      console.log("3) " + responseJson.list[i].dt_txt);
      console.log(kelvinToFahrenheit(responseJson.list[i].main.temp))
    } else if (i > 32 && i < 40) {
      console.log("4) " + responseJson.list[i].dt_txt);
      console.log(kelvinToFahrenheit(responseJson.list[i].main.temp))
    } else if (i > 40 && i < 48) {
      console.log("5) " + responseJson.list[i].dt_txt);
      console.log(kelvinToFahrenheit(responseJson.list[i].main.temp))
    } else if (i > 48 && i < 56) {
      console.log("6) " + responseJson.list[i].dt_txt);
      console.log(kelvinToFahrenheit(responseJson.list[i].main.temp))
    }
  }
}
