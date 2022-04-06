const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let LEFT, UP, RIGHT, DOWN;
LEFT = UP = RIGHT = DOWN = false;

let friction = 0.05;

class Vector{
    constructor(x , y){
        this.x = x;
        this.y = y;
    }

    add(v){
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtract(v){
        return new Vector(this.x - v.x, this.y - v.y);
    }

    multiply(n){
        return new Vector(this.x * n, this.y * n);
    }

    drawVector(origin_x = 0, origin_y = 0, factor = 1 ,color = "black"){
        ctx.beginPath();
        
        ctx.strokeStyle = color;
        ctx.moveTo(origin_x, origin_y);
        ctx.lineTo(origin_x + factor*this.x, origin_y + factor*this.y);
        ctx.stroke();

        ctx.closePath();
    }
}

class Ball{
    constructor(x, y, r){
        this.pos = new Vector(x, y);
        this.radius = r;

        this.velocity = new Vector(0 , 0);
        this.accel = new Vector(0, 0);
    }

    draw(color = "black"){
        ctx.beginPath();

        ctx.fillStyle = color;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
        ctx.fill();

        ctx.closePath();
    }

    move(){
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

        if(!LEFT && !RIGHT){
            this.accel.x = 0;
        }

        if(!UP && !DOWN){
            this.accel.y = 0;
        }

        this.velocity = this.velocity.add(this.accel);
        this.velocity = this.velocity.multiply(1 - friction);
        this.pos = this.pos.add(this.velocity);
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

    b1.draw();
    
    b1.accel.drawVector(b1.pos.x, b1.pos.y, 50, "green");
    b1.velocity.drawVector(b1.pos.x, b1.pos.y, 10, "red");
    b1.pos.drawVector(0, 0, 1, "yellow");

    b1.move();

    requestAnimationFrame(mainLoop);
}

let b1 = new Ball(200, 300, 30)

requestAnimationFrame(mainLoop);