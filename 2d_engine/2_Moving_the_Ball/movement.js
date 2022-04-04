const canv = document.getElementById("myCanvas");
const ctx = canv.getContext("2d");

let x = y = 200;

let LEFT, UP, RIGHT, DOWN;
LEFT = UP = RIGHT = DOWN = false;

function drawCircle(x, y, r){
    with(ctx){
        fillStyle = "red";
        beginPath();
        arc(x, y, r, 0, Math.PI*2);
        fill();
        stroke();
    }
}

function move(){
    if(LEFT){
        x--;
    }

    if(UP){
        y--;
    }

    if(RIGHT){
        x++;
    }

    if(DOWN){
        y++;
    }
}

//Handle key pressed down
canv.addEventListener('keydown', function(e){
    switch(e.keyCode){
        case 37:
            LEFT = true;
            break;
        case 38:
            UP = true;
            break;
        case 39:
            RIGHT = true;
            break;
        case 40:
            DOWN = true;
            break;
    }
});

//Handle key being released
canv.addEventListener('keyup', function(e){
    switch(e.keyCode){
        case 37:
            LEFT = false;
            break;
        case 38:
            UP = false;
            break;
        case 39:
            RIGHT = false;
            break;
        case 40:
            DOWN = false;
            break;
    }
});

function main(){
    ctx.clearRect(0, 0, canv.width , canv.height);
    drawCircle(x, y, 40);
    move();
    

    requestAnimationFrame(main);
}

requestAnimationFrame(main);
