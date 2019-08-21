// Wait for the DOM to be ready
var data = {};
$(document).ready(function() {
  //console.log("Document is loaded");

  

  $("#SignIn_Submit").click(function(event) {
    // console.log(data);
    if (data[$("#SignIn_Username").val()] == $("#SignIn_Password").val()) {
      console.log("SignIn Success");
      $("#home").html("<h1>You are successfully Logged In</h1>");
    }
  });

  $("#SignUp_Submit").click(function(event) {
    //console.log("I am submitted");
    data[$("#Signup_Username").val()] = $("#SignUp_Password").val();
    // console.log(data);
  });
});
