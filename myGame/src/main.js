import kaplay from "kaplay";

const k = kaplay({
    canvas: document.getElementById("canvas"),
    width: 144,
    height: 256,
    letterbox: true,
    scale: 16,
});

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
        height: 28,
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
        width: 92,
        height: 25,
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
    pos(0,200)
])
const ground2 = k.add([
    sprite("ground"),
    pos(144,200)
])
onUpdate(
    ()=>{
        bg1.move(-20,0)
        bg2.move(-20,0)
        if(bg1.pos.x <= -width()) bg1.pos.x = bg2.pos.x + width();
        if(bg2.pos.x <= -width()) bg2.pos.x = bg1.pos.x + width();
        ground1.move(-50,0)
        ground2.move(-50,0)
        if(ground1.pos.x <= -width()) ground1.pos.x = ground2.pos.x + width();
        if(ground2.pos.x <= -width()) ground2.pos.x = ground1.pos.x + width();
    }
)
k.loadRoot("./"); 

