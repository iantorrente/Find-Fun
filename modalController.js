function displayHours(locationObj) {
  console.log("STORE entry of selected item:");
  console.log(locationObj);
  $('.location-hours').empty();

  if (locationObj.hasOwnProperty('opening_hours')) {

    if (locationObj.opening_hours.hasOwnProperty('weekday_text')) {
      $('.location-open').text(`${locationObj.opening_hours.open_now == true ? "Open Now" : "Currently Closed"}`);

      for (let j = 0; j < locationObj.opening_hours.weekday_text.length; j++) {
        $('.location-hours').append(`<li>${locationObj.opening_hours.weekday_text[j]}</li>`)
      }
    }
  } else {
    $('.location-hours').append(`<p>No hours listed</p>`);
  }
}

function displayName(locationObj) {
  $('.location-name').text(locationObj.name);
}

function displayPhone(locationObj) {
  $('.location-phone').text(locationObj.formatted_phone_number);
}

function displayReviews(location) {
  console.log("Displaying reviews");
  let reviews = location.reviews;
  $('.reviews-list').empty();
  if (location.reviews) {
    for (let i = 0; i < reviews.length; i++) {
      $('.reviews-list').append(
        `<li class=review-item>
          <h4>${reviews[i].author_name}</h4>
          <p>Rating: ${reviews[i].rating}</p>
          <p>${reviews[i].relative_time_description}</p>
          <p>${reviews[i].text}</p>
        </li>`
      )
    }
  } else {
    $('.reviews-list').append(
      `<h3 class=no-reviews>No Reviews</h3>`
    )
  }
}

function displayModal(locationName, STORE) {
  for (let i = 0; i < STORE.length; i++) {
    if (locationName == STORE[i].name) {
      displayName(STORE[i]);
      displayPhone(STORE[i]);
      displayHours(STORE[i]);
      displayReviews(STORE[i]);
    }
  }
}
