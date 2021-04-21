// IMPORT DATA & SET-UP MAP
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Create the map object
var myMap = L.map("map", {
  center: [28.304381, -196.526448],
  zoom: 2.5
});

// Adding the tile layer for Open Street Map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Definite URL variable of geoJSON link
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson?";

// Import & Visualize the Data
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Create a function for the radius of markers related to magnitude
function calculateRadius (magnitude) {
  return magnitude * 3
}

// Create a function for coloring the markers according to depth
function colorMarker (depth) {
  if (depth > 90 ) {
    return "#ea2c2c"
  }
  if (depth > 70) {
    return "	#ea822c"
  }
  if (depth > 50) {
    return "	#ee9c00"
  }
  if (depth > 30) {
    return "	#eecc00"
  }
  if (depth > 10) {
    return "	#d4ee00"
  }
  else {
    return "#98ee00"
  }
}
// 
d3.json(baseURL).then(function (data) {
  // earthquake = data.features
  // console.log(earthquake[0].geometry.coordinates)
  L.geoJSON(data, {
    pointToLayer: function (feature, latLng) {
      return L.circleMarker(latLng)
      
    },

    //Bind Popups to each feature
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Magnitude: " + feature.properties.mag + "Depth: " + feature.geometry.coordinates[2] + " Location: " + feature.properties.place
      )
      // style: 
    },
    
    // Style markers
    style: function (feature, layer) {
      return {
        radius: calculateRadius(feature.properties.mag),
        opacity: 0,
        fillOpacity: .75, 
        color: colorMarker(feature.geometry.coordinates[2])
      }
    }

  }).addTo(myMap);

})

// Here we create a legend control object.
var legend = L.control({
  position: "bottomright"
});
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var grades = [-10, 10, 30, 50, 70, 90];
  var colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"];
  // Loop through our intervals and generate a label with a colored square for each interval.
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += "<div class = 'color-text-combo'><i style='background: "
      + colors[i]
      + "'></i> "
      + grades[i]
      + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "</div><br>" : "+");
  }
  return div;
};
// We add our legend to the map.
legend.addTo(myMap);



// For docs, refer to https://dev.socrata.com/docs/queries/where.html.
// And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.


// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.


// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.


// HINT: The depth of the earth can be found as the third coordinate for each earthquake.


// Include popups that provide additional information about the earthquake when a marker is clicked.


// Create a legend that will provide context for your map data.


// Your visualization should look something like the map above.