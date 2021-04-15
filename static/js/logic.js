// IMPORT DATA & SET-UP MAP
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~


// Create the map object
var myMap = L.map("map", {
    center: [28.304381,-196.526448],
    zoom: 2
  });
  
// Adding the tile layer for Open Street Map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Definite URL variable of geoJSON link
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson?";

// Import & Visualize the Data
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~

d3.json(baseURL, function(data) {
  console.log(data)
  createImageBitmap(data.features)
  // console.log(magnitude)
});


// Store the API query variables.
var quake_features = data.features
var magnitude = '$where=magnitude
var depth = data.geometry.coordinates[2]
console.log(depth)


// For docs, refer to https://dev.socrata.com/docs/queries/where.html.
// And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.


// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.


// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.


// HINT: The depth of the earth can be found as the third coordinate for each earthquake.


// Include popups that provide additional information about the earthquake when a marker is clicked.


// Create a legend that will provide context for your map data.


// Your visualization should look something like the map above.