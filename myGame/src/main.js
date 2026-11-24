import kaplay from "kaplay";
let speed = 50;
let speedIncrement = 0.01;
const minY = 30;
const maxY = 100;
const minGap = 40;
const maxGap = 100;
let isRunning = true;
let score = 0

const k = kaplay({
    canvas: document.getElementById("canvas"),
    width: 144,
    height: 256,
    letterbox: true,
    scale: 8,
});
k.loadRoot("./"); 
k.setGravity(100)


k.loadSpriteAtlas("sprites/flappybird.png",{
    "bg_day":{
        x: 0,
        y: 0,
        width: 144,
        height: 256,
    },
    "bg_night":{
        x: 146,
        y: 0,
        width: 144,
        height: 256,
    },
    "ground":{
        x: 292,
        y: 0,
        width: 144,
        height: 56,
    },
    "pipe_green_top":{
        x:56,
        y:323,
        width: 26,
        height: 160,
    },
    "pipe_green_bottom":{
        x:84,
        y:323,
        width: 26,
        height: 160,
    },
    "bird_yellow":{
        x:0,
        y:483,
        width:84,
        height: 23,
        sliceX: 3,
        anims:{
            "fly":{
                from:0 ,
                to:2,
                loop: true,
                speed: 10,
            }
        }
    },
    "get_ready":{
        x: 295,
        y: 59,
        width: 92,
        height: 25,
    },
    "game_over":{
        x: 395,
        y: 59,
        width: 96,
        height: 25,
    },
    "restart":{
        x: 354,
        y: 118,
        width: 52,
        height: 30,
    }
})

const bg1 = k.add([
    sprite("bg_day"),
    pos(0,0)
           ])
const bg2 = k.add([
    sprite("bg_day"),
    pos(144,0)
])
const ground1 = k.add([
    sprite("ground"),
    pos(0,200),
    body({isStatic:true}),
    area(),
    "kill"
])
const ground2 = k.add([
    sprite("ground"),
    pos(144,200),
    body({isStatic:true}),
    area(),
    "kill"
])
const bird = k.add([
    sprite("bird_yellow"),
    pos(width()/4,(height()-56)/2),
    body(),
    area({
        shape: new k.Rect(k.vec2(4,8),14,12)
    })
])
const scoretext = add([
    text("0",{
        size: 12,
        width: 100,
        font: "sans-serif"
    }),
    pos(120,20),
    z(100)
])

let pipes = []
const generatepipe = ()=>{
    let y = k.rand(minY,maxY)
    let gap = k.rand(minGap,maxGap)
    const pipe1 = k.add([
        sprite("pipe_green_top"),
        anchor("botleft"),
        pos(width(),y),
        area(),
        body({isStatic : true}),
        "kill"
    ])
    pipe1.add([
        sprite("pipe_green_bottom"),
        pos(0,gap),
        area(),
        body({isStatic: true}),
        "kill"
    ])
    pipe1.add([
        rect(1,gap),
        pos(13,0),
        opacity(0),
        area(),
        "score"
    ])
    pipes.push(pipe1)
    if (pipes.length > 2){
        pipes.shift().destroy();
    }
}


bird.play("fly")
onClick(()=>{
    bird.jump(70)
})
onKeyPress("space",()=>{
    bird.jump(70)
})

bird.onCollide("kill",()=>{
    k.setGravity(0)
    onClick(()=>{
       bird.jump(0.000001)
    })
    onKeyPress("space",()=>{
       bird.jump(0.00001)
    })
    isRunning = false;
    bird.stop("fly")
    add([sprite("game_over"),pos(center()),anchor("center"),z(100)])
})
bird.onCollide("score",()=>{
    score++;
    scoretext.text = score
})

onUpdate(
    ()=>{
        if(!isRunning){
            return;
        }
        bg1.move(-speed/4,0)
        bg2.move(-speed/4,0)
        if(bg1.pos.x <= -width()) bg1.pos.x = bg2.pos.x + width();
        if(bg2.pos.x <= -width()) bg2.pos.x = bg1.pos.x + width();
        ground1.move(-speed,0)
        ground2.move(-speed,0)
        if(ground1.pos.x <= -width()){
             ground1.pos.x = ground2.pos.x + width()
             generatepipe()
        };
        if(ground2.pos.x <= -width()){ 
            ground2.pos.x = ground1.pos.x + width()
            generatepipe()
        };
        pipes.forEach(pipe => {
            pipe.move(-speed,0)
        });
        bird.angle = bird.vel.y / 10;
        speed += speedIncrement;

    }
)

