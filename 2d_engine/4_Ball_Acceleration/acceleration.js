const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let LEFT, UP, RIGHT, DOWN;
LEFT = UP = RIGHT = DOWN = false;

let friction = 0.05;

let BALLZ = [];

class Ball{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.acceleration = 1;
        this.vel_x = 0;
        this.vel_y = 0;
        this.acc_x = 0;
        this.acc_y = 0;

        BALLZ.push(this);
    }

    move(){
        LEFT ? this.acc_x = -this.acceleration : this.acc_x = this.acc_x;
        UP ? this.acc_y = -this.acceleration : this.acc_y = this.acc_y;
        RIGHT ? this.acc_x = this.acceleration : this.acc_x = this.acc_x;
        DOWN ? this.acc_y = this.acceleration : this.acc_y = this.acc_y;

        if(!LEFT && !RIGHT){
            this.acc_x = 0;
        }

        if(!UP && !DOWN){
            this.acc_y = 0;
        }

        this.vel_x += this.acc_x;
        this.vel_y += this.acc_y;

        this.vel_x *= 1-friction;
        this.vel_y *= 1-friction;

        this.x += this.vel_x;
        this.y += this.vel_y;
    }
    
    draw(){
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
    }

    drawVelocity(){
        let scale_factor = 10;
        
        ctx.strokeStyle = "green";

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo((this.x + scale_factor*this.vel_x), (this.y + scale_factor*this.vel_y));
        ctx.stroke();
    }

    drawAcceleration(){
        let scale_factor =40;
        
        ctx.strokeStyle = "blue";

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo((this.x + scale_factor*this.acc_x), (this.y + scale_factor*this.acc_y));
        ctx.stroke();
    }
}

function keyControl(){
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
        }
    });

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
        }
    });
}

function mainLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    keyControl();

    BALLZ.forEach(b => {
        b.draw();
        b.move();
        b.drawVelocity();
        b.drawAcceleration();
    });

    requestAnimationFrame(mainLoop);
}

let b1 = new Ball(200, 100, 30);

requestAnimationFrame(mainLoop);
