const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let LEFT, UP, RIGHT, DOWN;
LEFT = UP = RIGHT = DOWN = false;

let friction = 0.1;

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    multiply_scalar(n){
        return new Vector(this.x * n, this.y * n);
    }

    mag(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    add(v){
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subr(){
        return new Vector(this.x - v.x, this.y - v.y);
    }

    static dot_product(v1, v2){
        return v1.x * v2.x + v1.y * v2.y;
    }

    normal(){
        return new Vector(-this.y, this.x);
    }

    unit(){
        if(this.mag() == 0){
            return new Vector(0, 0);
        }else{
            return this.multiply_scalar(1/this.mag());
        }
    }

    draw_vector(x_origin = 0, y_origin = 0, factor = 1, color = "black"){
        ctx.beginPath();

        ctx.strokeStyle = color;
        ctx.moveTo(x_origin, y_origin);
        ctx.lineTo(x_origin + factor*this.x, y_origin + factor*this.y);
        ctx.stroke();

        ctx.closePath();
    }
}

class Ball{
    constructor(x, y, r){
        this.pos = new Vector(x, y);
        this.radius = r;

        this.acceleration = 2;

        this.velocity = new Vector(0, 0);
        this.accel = new Vector(0, 0);
    }

    draw(color = "black"){
        ctx.beginPath();

        ctx.fillStyle = color;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
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

        this.accel = this.accel.unit().multiply_scalar(this.acceleration);
        this.velocity = this.velocity.add(this.accel);
        this.velocity = this.velocity.multiply_scalar(1 - friction);
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

function unitCircle(obj){
    ctx.beginPath();

    ctx.strokeStyle = "black";
    ctx.arc(580, 420, 50, 0, 2*Math.PI);
    ctx.stroke();

    obj.accel.unit().multiply_scalar(50).draw_vector(580, 420, 1, "blue");
    obj.accel.normal().unit().multiply_scalar(50).draw_vector(580, 420, 1,"red");

    ctx.closePath();
}

function mainLoop(){
    ctx.clearRect(0, 0, canvas.width , canvas.height);
    
    keyControl();
    
    b.draw();
    b.move();

    unitCircle(b);

    requestAnimationFrame(mainLoop);
}

b = new Ball(200, 200, 40);

requestAnimationFrame(mainLoop);