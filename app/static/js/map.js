var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 2
  });
}

function drawOnclick() {
  var antennasCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map,
    center: {
      lat: 48.85341,
      lng: 2.34
    },
    radius: 1000 * 100
  });
  map.fitBounds(antennasCircle.getBounds());
}

function drawCircle(lat, lng, radius, strokeColor, fillColor) {
  var antennasCircle = new google.maps.Circle({
    strokeColor: strokeColor, //#FF0000
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: fillColor, //#FF0000
    fillOpacity: 0.35,
    map: map,
    center: {
      lat: lat,
      lng: lng
    },
    radius: radius
  });
  map.fitBounds(antennasCircle.getBounds());
}

function showStorms() {
  $.ajax({
    type: "GET",
    url: `storm_data`,
    success: function(result) {
      console.log(eval(result)[0].geometries[0].coordinates[0]); // Longitude
      console.log(eval(result)[0].geometries[0].coordinates[1]); // Latitude
      console.log(eval(result)[0].geometries[1].coordinates[0]); // Longitude
      console.log(eval(result)[0].geometries[1].coordinates[1]); // Latitude

      const Longitude1 = eval(result)[0].geometries[0].coordinates[0];
      const Latitude1 = eval(result)[0].geometries[0].coordinates[1];
      const Longitude2 = eval(result)[0].geometries[1].coordinates[0];
      const Latitude2 = eval(result)[0].geometries[1].coordinates[1];

      //quick calculation
      var X = (Latitude1 + Latitude2) / 2;
      var Y = (Longitude1 + Longitude2) / 2;

      //var D = Math.sqrt(Math.pow((Latitude1 - Latitude2), 2) + Math.pow((Longitude1 - Longitude2), 2))

      //var _Radius = D/2

      drawCircle(X, Y, 1000000, "#FF0000", "#FF0000");
    },
    error: function(result) {
      console.log(result);
    }
  });
}

function showAntennasArea() {
  var X1 = parseFloat(document.getElementById("Antenna1X").value);
  var Y1 = parseFloat(document.getElementById("Antenna1Y").value);
  var X2 = parseFloat(document.getElementById("Antenna2X").value);
  var Y2 = parseFloat(document.getElementById("Antenna2Y").value);

  drawCircle(X1, Y1, 5000, "green", "green");

  drawCircle(X2, Y2, 5000, "green", "green");

  $.ajax({
    type: "POST",
    url: `compute_distance?X1=${X1}&Y1=${Y1}&X2=${X2}&Y2=${Y2}`,
    success: function(result) {
      console.log(eval(result));

      $("#result_distance").html(`<p>
        <h3>Distance Result is:</h3>
        <br />
        <div id="result_distance_value">${Math.round(eval(result).r * 100) /
          100}</div>kilometers
          <br />    
          <br />         
        `);
    },
    error: function(result) {
      console.log(result);
    }
  });
}

function calculateSignalRange() {
  var HTx = parseFloat(document.getElementById("HTx").value);
  var HRx = parseFloat(document.getElementById("HRx").value);

  console.log(HTx);
  console.log(HRx);
  $.ajax({
    type: "POST",
    url: `compute_signal_range?HTx=${HTx}&HRx=${HRx}`,
    success: function(result) {
      console.log(eval(result));

      $("#result_signal_range").html(`<p>
        <h3>Signal Result is:</h3>
          <br />
        ${Math.round(eval(result).r * 100) / 100} miles
        <br />
        or
        <br />

        <div id="result_signal_range_value">${Math.round(
          eval(result).r * 1.609 * 100
        ) / 100}</div>
        
        kilometers
        <p>
        `);

      checkIfInRange();
    },
    error: function(result) {
      console.log(result);
    }
  });
}

function checkIfInRange() {
  var result_distance_value = parseFloat(
    document.getElementById("result_distance_value").innerHTML
  );
  var result_signal_range_value = parseFloat(
    document.getElementById("result_signal_range_value").innerHTML
  );

  if (result_signal_range_value > result_distance_value) {
    document.getElementById("result_comparison").innerHTML =
      "Congratulations, internet connection is possible.";
  } else {
    document.getElementById("result_comparison").innerHTML =
      "We are sorry, internet connection is NOT possible. Consider changing antenna height or location.";
  }
}
