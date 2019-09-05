// Wait for the DOM to be ready
var data = {};
var user = { Muzz: 123 };
var copy = $("#Info").html();

$(document).ready(function() {
  $.getJSON("bikerentals.json", function(json) {
    console.log("Success reading Json File");
    data = json;
  });
  $("#datable_1 tbody").on("click", "tr", function() {
    $(this).toggleClass("selected");
  });
  $("#button").click(function() {
    alert(table.rows(".selected").data().length + " row(s) selected");
  });

  $("#SignIn_Submit").click(function(event) {
    // console.log(data);

    if (user[$("#SignIn_Username").val()] == $("#SignIn_Password").val()) {
      console.log("SignIn Success");
      $("#hide").hide();

      $("#change").html(copy);

      $.each(data.products, function(i, item) {
        $("#data").append(
          "<tr><td>" +
            item.id +
            "</td><td>" +
            item.name +
            "</td><td>" +
            item.price +
            "</td><td><img src='" +
            item.image +
            "' /></td><td>" +
            item.product_type +
            "</td></tr>"
        );
      });
    }
  });
});
