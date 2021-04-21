// IMPORT DATA & SET-UP MAP
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Create the map object
var myMap = L.map("map", {
  center: [28.304381, -196.526448],
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

function calculateRadius (magnitude) {
  return magnitude * 3
}

function colorMarker (depth) {
  if (depth < 10) {
    return "#72fa41"
  }
  if (depth < 30) {
    return "	#FFA500"
  }
  if (depth < 50) {
    return "	#FF4500"
  }
  else {
    return "#000000"
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
    },
    
    // Style markers
    style: function (feature, layer) {
      return {
        radius: calculateRadius(feature.properties.mag),
        opacity: 0,
        fillOpacity: .75, 
        // fillColor: 
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

// "<br> Capacity: " + station.capacity + "<br>"
// function to return the color based on magnitude
// function markerColor(magnitude) {
//   if (magnitude > 4) {
//     return 'red'
//   } else if (magnitude > 3) {
//     return 'orange'
//   } else if (magnitude > 2) {
//     return 'yellow'
//   } else {
//     return 'green'
//   }
// }

// // function for opacity based on magnitude
// function markerOpacity(magnitude) {
//   if (magnitude > 6) {
//     return .99
//   } else if (magnitude > 5) {
//     return .80
//   } else if (magnitude > 4) {
//     return .70
//   } else if (magnitude > 3) {
//     return .60
//   } else if (magnitude > 2) {
//     return .50
//   } else if (magnitude > 1) {
//     return .40
//   } else {
//     return .30
//   }
// }

// // add legend to map
// legend.onAdd = function () {

//   var div = L.DomUtil.create('div', 'info legend')

//   div.innerHTML = "<h3>Magnitude Legend</h3><table><tr><th>>= 4</th><td>Red</td></tr><tr><th>>= 3</th><td>Orange</td></tr><tr><th>>= 2</th><td>Yellow</td></tr><tr><th>< 2</th><td>Green</td></tr></table>";

//   return div;
// };


// d3.json(baseURL, function(data) {
//   console.log(data)
//   createImageBitmap(data.features)
//   // console.log(magnitude)
// });


// Store the API query variables.
// var quake_features = data.features
// var magnitude = '$where=magnitude
// var depth = data.geometry.coordinates[2]
// console.log(depth)


// For docs, refer to https://dev.socrata.com/docs/queries/where.html.
// And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.


// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.


// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.


// HINT: The depth of the earth can be found as the third coordinate for each earthquake.


// Include popups that provide additional information about the earthquake when a marker is clicked.


// Create a legend that will provide context for your map data.


// Your visualization should look something like the map above.