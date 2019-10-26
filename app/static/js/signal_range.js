$(document).ready(function() {
  $("#compute").click(function() {
    var HTx = $("#HTx").val();
    var HRx = $("#HRx").val();

    console.log(HTx);
    console.log(HRx);
    $.ajax({
      type: "POST",
      url: `compute_signal_range?HTx=${HTx}&HRx=${HRx}`,
      success: function(result) {
        console.log(eval(result));

        $("#result").html(`<p>
           Result is:
           <br />
            <br />
           ${Math.round(eval(result).r * 100) / 100} miles
           <br />
           or
           <br />
           ${Math.round(eval(result).r * 1.609 * 100) / 100} kilometers
           <p>
           `);
      },
      error: function(result) {
        console.log(result);
      }
    });
  });
});
