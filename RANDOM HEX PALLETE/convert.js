window.onload = function randomize() {
    for (var i = 1; i < 5; i++) {
        var r = Math.random() * (255 - 0) + 0;
        var g = Math.random() * (255 - 0) + 0;
        var b = Math.random() * (255 - 0) + 0;
        rgbToHex(r, g, b, i)
    }
    document.addEventListener('click', (e) =>{
        let id = e.target.id;
        if (+id) {
            copy_tag(id)
        } else if (id == "1_name" || id == "2_name" || id == "3_name" || id == "4_name") {
            copy_text(id)
        }
    })
    animate("1_name")
    animate("2_name")
    animate("3_name")
    animate("4_name")
}

function rgbToHex(r, g, b, i) {
    var hex = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    document.getElementById(i).style.backgroundColor = hex
    document.getElementById(i).setAttribute('tag', hex)
    document.getElementById(i + '_name').innerText = hex
}
function copy_tag(id) {
    var hex = document.getElementById(id).getAttribute('tag')
    document.getElementById(id + '_name').innerText = "Copied!"
    navigator.clipboard.writeText(hex);
    animate(id + "_name")
    setTimeout(back_tag, 5000, id, hex)
}
function copy_text(id) {
    var hex = document.getElementById(id).innerText
    document.getElementById(id).innerText = "Copied!"
    navigator.clipboard.writeText(hex);
    animate(id)
    setTimeout(back_text, 5000, id, hex)
}
function back_text(id, hex) {
    document.getElementById(id).innerText = hex
    animate(id)
}
function back_tag(id, hex) {
    document.getElementById(id + '_name').innerText = hex
    animate(id + '_name')
}
function animate(id) {
    var textWrapper = document.getElementById(id);
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    let parent = document.getElementById(id);
    let targets = parent.getElementsByClassName('letter');


anime.timeline({loop: false})
  .add({
    targets: targets,
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
  })
}
function copy_pallete() {
    var hex_1 = document.getElementById("1").getAttribute('tag')
    var hex_2 = document.getElementById("2").getAttribute('tag')
    var hex_3 = document.getElementById("3").getAttribute('tag')
    var hex_4 = document.getElementById("4").getAttribute('tag')
    navigator.clipboard.writeText('1: ' + hex_1 + "\n2: " + hex_2 + '\n3: ' + hex_3 + '\n4: ' + hex_4)
}
