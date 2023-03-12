var canvas = document.getElementById('canvas')
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight
var ctx = canvas.getContext('2d')
let randomX;
let randomY
let startX = 250;
let startY = 250;
let stopGame = 0
let direction = 'right'
let length = 50
let wallCounter = 0
let appleCounter = 0
let clearCounter = 0
let score = appleCounter * 100 + length * 5 + 25 * wallCounter - 5 * clearCounter

const draw = () => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineWidth = 5
    ctx.strokeStyle = 'rgb(255,255,255)';
    switch (direction) {
        case 'right':
        startX++;
        break;
        case 'left':
            startX--;
        break;
        case 'up':
            startY--;
        break;
        case 'down':
            startY++;
        break;
    }
    ctx.lineTo(startX, startY);
    ctx.stroke();
    if (stopGame == 1) {
        clearInterval(intervalDraw);
    }
}

const checker = () =>{
    let imageData;
    switch (direction) {
        case 'right':
          imageData = ctx.getImageData(startX+5, startY, 1, 1);
          break;
        case 'left':
          imageData = ctx.getImageData(startX-5, startY, 1, 1);
          break;
        case 'up':
          imageData = ctx.getImageData(startX, startY-5, 1, 1);
          break;
        case 'down':
          imageData = ctx.getImageData(startX, startY+5, 1, 1);
          break;
    }
    const pixel = imageData.data;
    if (pixel[0] === 255 && pixel[1] === 255 && pixel[2] === 255) {
        console.log('selfHit')
        stopGame = 1
        selfHit()
    } else if (pixel[0] === 255 & pixel[1] === 0 && pixel[2]=== 0) {
        console.log('apple get')
        ctx.clearRect(randomX, randomY, 10, 10)
        length += 10
        appleCounter++
        updateApples()
        updateLength()
        score = appleCounter * 100 + length * 5 + 25 * wallCounter - 5 * clearCounter
        updateScore()
        apple()
    } else if (pixel[0] === 84 & pixel[1] === 34 && pixel[2]=== 8) {
        console.log('wallHit')
        stopGame = 1
        wallHit()
    } else {}
    if (stopGame == 1) {
        clearInterval(intervalChecker);
    }
}
const dedraw = () => {
    switch(direction) {
        case 'right' : ctx.clearRect(startX-length, startY-3, 6, 6); break;
        case 'left' : ctx.clearRect(startX+length, startY-3, 6, 6); break;
        case 'up' : ctx.clearRect(startX-3, startY+length, 6, 6); break;
        case 'down' : ctx.clearRect(startX-3, startY-length, 6, 6); break;
        default : ctx.clearRect(startX-length, startY-3, 6, 6)
    }
    if (stopGame == 1) {
        clearInterval(intervalDeDraw);
    }
}
function change_dir(dir) {
    if (dir == direction) {
        return 0
    } else {
        direction = dir
        wallCounter++
        score = appleCounter * 100 + length * 5 + 25 * wallCounter - 5 * clearCounter
        updateWalls()
        updateScore()
    }
    
}
const apple = () => {
    randomX = Math.floor(Math.random()*980) + 10
    randomY = Math.floor(Math.random()*630) + 10
    ctx.fillStyle = 'rgb(255,0,0)'
    ctx.fillRect(randomX, randomY, 10, 10)
}
const walls = () =>{
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineWidth = 10
    ctx.strokeStyle = 'rgb(84, 34, 8)'
    ctx.lineTo(1000, 0);
    ctx.moveTo(1000,0)
    ctx.lineTo(1000, 650)
    ctx.moveTo(1000, 650)
    ctx.lineTo(0, 650)
    ctx.moveTo(0, 650)
    ctx.lineTo(0,0)
    ctx.closePath()
    ctx.stroke()
}
function updateWalls() {
    document.getElementById('walls').innerText = wallCounter
}
function updateApples() {
    document.getElementById('apples').innerText = appleCounter
}
function updateLength() {
    document.getElementById('length').innerText = length
}
function updateScore() {
    document.getElementById('score').innerText = score
}
function updateCost() {
    document.getElementById('cost').innerText = (5 + 2 * clearCounter)
}
function clearMap() {
    if (appleCounter >= (5 + 2 * clearCounter)) {
        appleCounter = appleCounter - 5 - 2 * clearCounter
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        clearCounter++
        walls()
        apple()
        updateApples()
        updateCost()
    } else {
        document.getElementById('cost').style.backgroundColor = 'red'
        delay(1000).then(()=>{
            document.getElementById('cost').style.backgroundColor = 'blueviolet'
        })
    }
}
function selfHit() {
    document.getElementById('selfHit').style.top = '50%'
    document.getElementById('selfHit').style.left = '50%'
    document.getElementById('reload').style.top = '60%'
    document.getElementById('reload').style.left = '50%'
}
function wallHit() {
    document.getElementById('wallHit').style.top = '50%'
    document.getElementById('wallHit').style.left = '50%'
    document.getElementById('reload').style.top = '60%'
    document.getElementById('reload').style.left = '50%'
}
function randomObstacle() {
    if (score >= 2000) {
        let randomXRec = Math.floor(Math.random()*890) + 40 //max 930 min 40
        let randomYRec = Math.floor(Math.random()*590) + 40 //max 630 min 40
        if (Math.abs(randomXRec - startX) <20 || Math.abs(randomYRec - startY) < 20) {
            console.log('too close to snake')
            return 0
        }
        if (Math.abs(randomXRec - randomX) < 40 || Math.abs(randomYRec - randomY) < 40) {
            console.log('too close to apple')
            return 0
        }
        let randomRecHeight = Math.floor(Math.random()*90) + 10 //max 40 min 10
        let randomRecWidth = Math.floor(Math.random()*90) + 10 //max 40 min 10
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.fillRect(randomXRec, randomYRec, randomRecWidth, randomRecHeight)
    }
}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
walls()
apple()
document.getElementById('reload').addEventListener('click', ()=>{
    location.reload()
})
document.getElementById('clear').addEventListener('click', clearMap)
const intervalDraw = setInterval(draw, 1000 / 60);
const intervalDeDraw = setInterval(dedraw, 1000 / 60)
const intervalChecker = setInterval(checker, 1000 / 60)
const intervalObstacle = setInterval(randomObstacle, 9000)

  
