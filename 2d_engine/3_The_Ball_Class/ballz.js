const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//Key control booleans
let LEFT, UP, RIGHT, DOWN, SWITCH_BALL;

LEFT =  UP = RIGHT = DOWN = SWITCH_BALL = false;


//Ball array for storing all balls

let BALLZ = [];

class Ball{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.player = false;

        BALLZ.push(this);
    }

    draw(){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
    }

    move(){
        //Oooouuuhhh, ternary operators <3
        // condition ? exprIfTrue : exprIfFalse
        if(this.player){
            LEFT ? this.x = this.x - 1: this.x = this.x;
            UP ? this.y = this.y - 1: this.y = this.y;
            RIGHT ? this.x = this.x + 1: this.x = this.x;
            DOWN ? this.y = this.y + 1: this.y = this.y;
        }
    }
}

function keyControl(){
    // control for a key being pressed
    canvas.addEventListener("keydown", function(e){
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
            case 32: //Space bar
                SWITCH_BALL = true;
                break;
        }
    });

    //key release control
    canvas.addEventListener("keyup", function(e){
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
            case 32:
                SWITCH_BALL = false;
                break;
        }
    });
}

function switchBall(){
    if(SWITCH_BALL){
        // find current movable ball
        let n = 0;
        for(let i = 0; i < BALLZ.length; i++){
            if(BALLZ[i].player){
                n = i;
                break;
            }
        }

        // move to next positon
        BALLZ[n].player = false;
        if(n + 1 == BALLZ.length){
            n = -1;
        }
        BALLZ[(n + 1)].player = true;
    }
}

function mainLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    keyControl();

    BALLZ.forEach(ball => {
        ball.draw();
        ball.move();
    });

    switchBall();

    requestAnimationFrame(mainLoop);
}

let b1 = new Ball(200, 200, 50);
let b2 = new Ball(100, 400, 20);
let b3 = new Ball(300, 250, 25);

b1.player = true;

requestAnimationFrame(mainLoop);
