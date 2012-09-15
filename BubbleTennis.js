// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 212;
canvas.width = document.body.clientWidth;
canvas.height = 280;
canvas.height = document.body.clientHeight;
//    http://github.com/willknott
document.body.appendChild(canvas);


var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grd.addColorStop(0, '#ff0000');
// R G B A
grd.addColorStop(1, '#ffffff');
ctx.fillStyle = grd;


////////  Draw the Canvas
var bgReady = false;
window.onload = function () {
//different way to create a function
bgReady = true;
};

//////////Create Red Lemonade


// RedL image
var RedLReady = false;
var RedLImage = new Image();
RedLImage.src = "redl.png";

RedLImage.onload = function () {
	RedLReady = true;
};

var RedL = {
	speed: 200 // movement in pixels per second
};  //created and edited an aspect of the Red object
RedL.x = canvas.width / 2;
RedL.y = canvas.height / 2;


/////// Make the computer listen to us...

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);






// Draw everything
var render = function () {
ctx.fillStyle = grd;
ctx.fillRect (0, 0, canvas.width, canvas.height);

	if (RedLReady) {
		ctx.drawImage(RedLImage, RedL.x, RedL.y);
	}


}

//// Where are our characters, the sums section....

// Update game objects called from the main function
// delta = number of miliseconds between calls
var update = function (delta) {
	if (38 in keysDown) { // Player holding up
		RedL.y -= RedL.speed * delta;
	}
	if (40 in keysDown) { // Player holding down
		RedL.y += RedL.speed * delta;
	}
//////// Stop going off screen
	if(RedL.y < 0) {
		RedL.y = 0;
	}
	if(RedL.y > canvas.height-RedLImage.height) {
		RedL.y = canvas.height-RedLImage.height;
	}
}

///    will@willknott.ie

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	then = now;
};

// Let's start this game!
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible

//use google / bing / yahoo / etc to find out about "Request Animation Javascript"