# Find Fun! (Thinkful-API-Capstone)
## Live Page: (https://iantorrente.github.io/Thinkful-API-Capstone/)
## Introduction
Find Fun! is a simple web app that allows users to input any location, be it a zipcode, address, geolocation, or just a location off the top of their head (e.g. "Big Ben" or "Walmart Los Angeles"), and recieve venues of their choosing around that location. Users are able to choose what type of venue they want to find from the drop down list and a radius as well, maxing out at 30 miles. 

Find Fun! also displays the current weather for the user's inputted location at the top of the page, as well as the city that the location is in. 

This is because at the heart of the app is the goal of helping users find fun and new things to do in any place that they want. Whether they're planning for a vacation, visiting a friend in a new town, or just want to find new things in their neighborhood, Find Fun! gives users the flexibility to plan their day ahead of time.

## Utilization
Find Fun! has three inputs that are required from the user: 1) A location to search around, 2) a search radius, and 3) a venue filter. Once a user has provided all three of these and submitted the query, up to 10 results are displayed based on their approximate distance from the inputted location.

A user is able to click on any of the locations and will be given hours of operation as well as the most recent user reviews if they are both available.

## Technologies & APIs
Find Fun! is a simple web app at its core and uses HTML, CSS, JavaScript, and JQuery at its core.

It utilizes three distinct endpoints to accomplish everything: 1) Google's Geocode API in order to turn a user's inputted location into longitude and latitude geolocations, 2) Google's Places API to find venues around the user's inputted location, based on the user's filters, and 3) the Open Weather API to use the user's geolocation in order to get the current weather.

On top of that, it uses two distinct endpoints from Google's Places API in order to display more detailed information to the user. The preliminary locations are fetched with Places' `/place/` endpoint in order to find locations and Places' `/places/details/` endpoint in order to fetch more detailed information about a location.

## Future Development
As it stands Find Fun! is a simple and easy way to quickly find things to do around a certain area, but there are still some other features that I'd love to implement in the future. 
  1) Provide more locations per search
     Right now Find Fun! only returns up to 10 locations per search because the data returned by Google's Places' `/place/` endpoint is paginated. Because of the way that the data is handled and then rendered onto the screen, the paginated data is never rendered. If possible, I'd love to jump in and take some time to unpaginate the data, store it into the app's `STORE` and then paginate the rendered results.
     
  2) Provide more detailed information from each search result
     For the purposes of this assignment I feel like there is enough material for Find Fun! to be submittable, but for the user, I'd love to provide even more details of the location that they're interested in. This includes photos, cross streets, menus (if applicable) and possibly other locations within a walking distance from the location.
     
  3) Provide 5 day weather forecast for the location
     The Open Weather API that Fund Fun! utilizes to fetch the current weather also has the capability to fetch a 5 day forecast. In order to give users more flexibility in planning, I'd love to implement the logic and the rendering to display both the current weather and a 5 day forecast so that users can have more functionality.
