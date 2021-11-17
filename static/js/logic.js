Cleveland = [41.473325, -81.660125]

var myMap = L.map("map", {
    center: Cleveland,
    zoom: 13
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url, function(Response) {
  for (var i = 0; i < data.features.length; i++) {
    latlng = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]]
    var color = '';
    var depth = data.features[i].geometry.coordinates[2];
    switch(true) {
      case (depth > -10 ):
      color = "#b30000";
      case (depth >= 10 && depth < 30):
        color = "#e34a33";
      case (depth >= 30 && depth < 50):
        color =  "#fc8d59";
      case (depth >= 50 && depth < 70):
        color = "#fdcc8a";
      case ( depth >= 70 && depth < 90):
        color = "#fef0d9";
      default:
        return "#98ee00"
    }
  
    var date = Response.features[i].properties.time
    var place = Response.features[i].properties.place
    var magnitude = Response.features[i].properties.manitude 

    L.circle(latlng, {
      opacity: 1,
      fillOpacity: 1,
      fillColor: color,
      radius: 1000 * magnitude,
      stroke: true,
      weight: 0.5
    }).bindPopup(`<p align = "left"> <strong>Date:</strong> ${date} <br>
    <strong>Location:</strong> ${place} <br> <strong>Magnitude:</strong> ${magnitude} </p>`).addTo(myMap)

    nmarker = L.layer

  }});
  var legend = L.control({position: "bottomright"});

    lengend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var grades = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
        var colors = ["b30000", "#e34a33", "#fc8d59", "#fdcc8a", "#fef0d9", "#98ee00"];
      
  var lex = [];
  grades.forEach(finction(grade, index) {
    lex.push("<div class = 'row'><li style=\"background-color: " + colors[index] +  "; width: 20px"+ "; height: 15px" + "\"></li>" + "<li>" + grade + "</li></div>");
  })
          
    
      };

  






