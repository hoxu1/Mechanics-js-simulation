const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let LEFT, UP, RIGHT, DOWN;

LEFT = UP = RIGHT = DOWN = false;

let friction = 0.1;
let Ball_arr = [];

class Vector{
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v){
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtr(v){
        return new Vector(this.x - v.x, this.y - v.y);
    }

    scal_multip(n){
        return new Vector(this.x * n, this.y * n);
    }

    mag(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    unit(){
        if(this.mag() != 0){
            return new Vector(this.x * (1/this.mag()), this.y*(1/this.mag()));
        }else{
            return new Vector(0, 0);
        }
    }
}

class Ball{
    constructor(x, y, r){
        this.pos = new Vector(x, y);
        this.radius = r;

        this.accel = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.player = false; //if true we can move it
        Ball_arr.push(this); //add it to all the other balls
    }

    arrow_move(){
        if(this.player){
            if(LEFT){
                this.accel.x = -1;
            }
            if(RIGHT){
                this.accel.x = 1;
            }
            if(UP){
                this.accel.y = -1;
            }
            if(DOWN){
                this.accel.y = 1;
            }

            if(!RIGHT && !LEFT){
                this.accel.x = 0;
            }

            if(!UP && !DOWN){
                this.accel.y = 0;
            }

            this.accel = this.accel.unit();
            this.velocity = this.velocity.add(this.accel).scal_multip(1-friction);
            this.pos = this.pos.add(this.velocity);
        }
    }

    draw(color = "red"){
        ctx.beginPath();

        ctx.fillStyle = color;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
        ctx.fill();

        ctx.closePath();
    }

    isColliding(b){
        if(this.radius + b.radius > this.pos.subtr(b.pos).mag()){
            return true;
        }else{
            return false;
        }
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

//This implements the collision
function penetration_resolution(b1, b2){
    if(b1.isColliding(b2)){
        d = b1.radius + b2.radius - b1.pos.subtr(b2.pos).mag();//pen depth
        b1.pos = b1.pos.add(b1.pos.subtr(b2.pos).unit().scal_multip(d/2));
        b2.pos = b2.pos.add(b2.pos.subtr(b1.pos).unit().scal_multip(d/2));
    }
}

function main(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    keyControl();

    Ball_arr.forEach((b, ind) => {
        b.draw();
        b.arrow_move();

        for(let i = ind + 1; i < Ball_arr.length; i++){
            penetration_resolution(Ball_arr[ind], Ball_arr[i]);
        }
    });

    requestAnimationFrame(main);
}

let b1 = new Ball(200, 200, 30);
b1.player = true;

let b2 = new Ball(350, 200, 60);
let b3 = new Ball(50, 50, 40);
let b4 = new Ball(500, 200, 30);

requestAnimationFrame(main);