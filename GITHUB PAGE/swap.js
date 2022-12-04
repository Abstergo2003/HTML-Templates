function swap() {
    // Get the checkbox
    var checkBox = document.getElementById("myCheck");
    // Get the output text
    var text = document.getElementById("polska");
    var text2 = document.getElementById("anglia");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.display = "block";
      text2.style.display = "none";
    } else {
      text.style.display = "none";
      text2.style.display = "block";
    }
  }