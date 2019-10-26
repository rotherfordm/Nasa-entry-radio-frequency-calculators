$(document).ready(function() {
  $("#compute").click(function() {
    var frequency = $("#frequency").val();
    var conductivity = $("#conductivity").val();

    $.ajax({
      type: "POST",
      url: `compute_attenuation_water?frequency=${frequency}&conductivity=${conductivity}`,
      success: function(result) {
        console.log(eval(result));

        $("#result").html(`<p>
            Result is:
            <br />
            <br />
            ${eval(result).r} ${eval(result).unit}
            </p>
            `);
      },
      error: function(result) {
        console.log(result);
      }
    });
  });
});
