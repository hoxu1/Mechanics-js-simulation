const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

function drawBall(x, y, r){
	with(ctx){
		strokeStyle = "#FF0000";
		beginPath();
		arc(x,y, 0, 2*Math.PI, r,true);
		closePath();
		stroke();
	}

}

function main(){
	drawBall(canvas.width/2, canvas.height/2,10);
}

main();
drawBall();