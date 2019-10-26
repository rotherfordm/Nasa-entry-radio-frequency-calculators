$(document).ready(function() {
  $("#compute").click(function() {
    var X1 = $("#X1").val();
    var Y1 = $("#Y1").val();
    var X2 = $("#X2").val();
    var Y2 = $("#Y2").val();

    $.ajax({
      type: "POST",
      url: `compute_distance?X1=${X1}&Y1=${Y1}&X2=${X2}&Y2=${Y2}`,
      success: function(result) {
        console.log(eval(result));

        $("#result").html(`<p>
              Result is:
              <br />
               <br />
              ${Math.round(eval(result).r * 100) / 100}
              
              `);
      },
      error: function(result) {
        console.log(result);
      }
    });
  });
});
