const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

function drawBall(x, y, r){
	with(ctx){
		beginPath();
		arc(x,y, r,0, 2*Math.PI);
		stroke();
	}

}

function drawPoint(r, angle){
	with(ctx){
		fillStyle = "red";
		fillRect(r*Math.cos(angle), r*Math.sin(angle), 1, 1);
	}
}


let angle = 0;
let increment = 1;

function main(){
	drawBall(canvas.width/2, canvas.height/2, 100);
	drawPoint(100, angle);
	angle += increment;
}

main();
setInterval(main,1000/60);