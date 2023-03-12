function color(clicked_id) {
    var nav1 = document.getElementById("nav1")
    var nav2 = document.getElementById("nav2")
    var nav3 = document.getElementById("nav3")
    var nav4 = document.getElementById("nav4")
    var navclick = document.getElementById(clicked_id)

    nav1.style.background = "#DADADA"
    nav1.style.color = "#222322"
    
    nav2.style.background = "#DADADA"
    nav2.style.color = "#222322"
    
    nav3.style.background = "#DADADA"
    nav3.style.color = "#222322"
    
    nav4.style.background = "#DADADA"
    nav4.style.color = "#222322"
    
    navclick.style.background = "#222322"
    navclick.style.color = "#DADADA"
  }