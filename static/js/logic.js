// LINK TO DATA: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

// Creating the map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Store the API query variables.
  // For docs, refer to https://dev.socrata.com/docs/queries/where.html.
  // And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.
  var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
  var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
  var complaint = "&complaint_type=Rodent";
  var limit = "&$limit=10000";
  