const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.height = 200;

function drawBall(x, y, r){
	with(ctx){
		beginPath();
		arc(x, y, r, 0, 2*Math.PI);
		stroke();
	}
}

function main(){
	//ctx.fillRect(0, 0);
	drawBall(200, 200, 50);
	drawBall(3,2,4);
}

main();