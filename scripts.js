const ball = document.getElementById("ball")
let y = 100
let velocity = 2
let gravity = 0.25
let x = 100
const body = document.getElementById("grid")
let block = document.getElementById("block")

console.log(block)

function moveball(){
    velocity += gravity
    y += velocity;
    ball.style.top = y + "px";
    requestAnimationFrame(moveball)
}

body.addEventListener("click",()=>{
    velocity = -8
})


setTimeout(() => {
    moveball()
}, 4000);

