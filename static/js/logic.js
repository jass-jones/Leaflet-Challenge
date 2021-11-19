Cleveland = [41.473325, -81.660125]

var myMap = L.map("map", {
    center: Cleveland,
    zoom: 5
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url, function(Response) {
  console.log(Response);
  for (var i = 0; i < data.features.length; i++) {
    latlng = [Response.features[i].geometry.coordinates[1], Response.features[i].geometry.coordinates[0]]
    var color = '';
    var depth = Response.features[i].geometry.coordinates[2];
    switch(true) {
      case (0 >= depth ):
      color = "#fef0d9";
      case (20 >= depth):
        color = "#fdd49e";
      case (40 >= depth):
        color =  "#fdbb84";
      case (60 >= depth):
        color = "#fc8d59";
      case (80 >= depth):
        color = "e34a33";
      case (100 >= depth):
        color = "#b30000"
    }
  
    var time = Response.features[i].properties.time
    var place = Response.features[i].properties.place
    var magnitude = Response.features[i].properties.mag

    L.circle(latlng, {
      opacity: 1,
      fillOpacity: 1,
      fillColor: color,
      radius: 1000 * magnitude,
      stroke: true,
      weight: 0.5
    }).bindPopup(`<p align = "left"> <strong>Date:</strong> ${time} <strong>Location:</strong> ${place} <br> <strong>Magnitude:</strong> ${magnitude} </p>`).addTo(myMap)

    nmarker = L.layer

}});
var legend = L.control({position: "bottomright"});

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var grades = ['0-20', '20-40', '40-60', '60-80', '80-100', '100+'];
  var colors = ["#fef0d9", "#fdd49e", "#fdbb84","#fc8d59", "#e34a33",  "#b30000"];
      
  var label = [];
  grades.forEach(function(grade, index) {
    label.push("<div class = 'row'><li style=\"background-color: " + colors[index] +  "; width: 20px"+"; height: 10px" + "\"></li>" + "<li>" + grade + "</li></div>");
  })
  
  div.innerHTML += "<ul>" + label.join("") + "</ul>"
  return div;
          
    
};

legend.addTo(myMap)
  






