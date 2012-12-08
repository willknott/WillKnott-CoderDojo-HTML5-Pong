// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth; 
//set canvas to available screensize
canvas.height = document.body.clientHeight;

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

var InitialSpeed = 200;
var InPlay = true;
var RedScore=0, WhiteScore=0;

//////////Create Red Lemonade


// RedL image
var RedLReady = false;
var RedLImage = new Image();
RedLImage.src = "redl.png";

// WhiteL image
var WhiteLReady = false;
var WhiteLImage = new Image();
WhiteLImage.src = "whitel.png";

RedLImage.onload = function () {
	RedLReady = true;
};

WhiteLImage.onload = function () {
	WhiteLReady = true;
};

var RedL = {
	speed: InitialSpeed // movement in pixels per second
};  //created and edited an aspect of the Red object
RedL.x = canvas.width-RedLImage.width; // On the right hand side
RedL.y = canvas.height / 2;

var WhiteL = {
	speed: InitialSpeed // movement in pixels per second
};  //created and edited an aspect of the Red object
WhiteL.x = 0//RedLImage.width; // On the left hand side
WhiteL.y = canvas.height / 2;

//Create the bubble
var Bubble = {
	speedx: InitialSpeed,
	speedy: InitialSpeed,
	diam: 10
};
Bubble.x = canvas.width/2;
Bubble.y = canvas.height/2;
	
//Going to use an image later but

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
	if (WhiteLReady) {
		ctx.drawImage(WhiteLImage, WhiteL.x, WhiteL.y);
	}
	// draw the ball
	ctx.beginPath();
    ctx.arc(Bubble.x, Bubble.y, Bubble.diam, 0, 2 * Math.PI, false);
	ctx.fillStyle = "black";
    ctx.fill();

	ctx.fillStyle = "white";
	ctx.font = "bold 16px Arial";
	ctx.fillText(WhiteScore, 100, 100);

	ctx.fillStyle = "red";
	ctx.font = "bold 16px Arial";
	ctx.fillText(RedScore, canvas.width-100, 100);
	
}

//// Where are our characters, the sums section....

// Update game objects called from the main function
// delta = number of miliseconds between calls
var update = function (delta) {
//Update Red 
	RedL.x = canvas.width-RedLImage.width; // Red always to one side
	if (38 in keysDown) { // Player holding up
		RedL.y -= RedL.speed * delta;
	}
	if (40 in keysDown) { // Player holding down
		RedL.y += RedL.speed * delta;
	}

//Update White 
	WhiteL.x = 0; // White always on the left hand edge, hence 0
	if (65 in keysDown) { // Player holding A
		WhiteL.y -= WhiteL.speed * delta;
	}
	if (90 in keysDown) { // Player holding Z
		WhiteL.y += WhiteL.speed * delta;
	}


//////// Stop Red going off screen
	if(RedL.y < 0) {
		RedL.y = 0;
	}
	if(RedL.y > canvas.height-RedLImage.height) {
		RedL.y = canvas.height-RedLImage.height;
	}
	
//////// Stop White going off screen
	if(WhiteL.y < 0) {
		WhiteL.y = 0;
	}
	if(WhiteL.y > canvas.height-WhiteLImage.height) {
		WhiteL.y = canvas.height-WhiteLImage.height;
	}
//Update Bubble
	if (InPlay){
		Bubble.x += Bubble.speedx * delta;
		Bubble.y += Bubble.speedy * delta;
	}
	else{
		Bubble.x = canvas.width/2;
		Bubble.y = canvas.height/2;
		Bubble.speedx = InitialSpeed;
		Bubble.speedy = InitialSpeed;

	};
	
	if (!InPlay) {
		if (66 in keysDown){ // b for new ball
			InPlay = true;
		}
	}

	
	if(Bubble.y < 0 + Bubble.diam){
		Bubble.y = 0 + Bubble.diam;
		//Set to the edge
		Bubble.speedy = -Bubble.speedy;
	}
	if(Bubble.y > canvas.height-Bubble.diam) {
		Bubble.y = canvas.height-Bubble.diam;  //set to the edge
		Bubble.speedy = -Bubble.speedy;
	}


	
	if (
		RedL.x <= (Bubble.x + Bubble.diam)
		&& Bubble.x <= (RedL.x + RedLImage.width)
		&& RedL.y <= (Bubble.y + Bubble.diam)
		&& Bubble.y <= (RedL.y + RedLImage.height)
	) {//bounce
		Bubble.x = RedL.x - Bubble.diam; //move to the edge of the paddle
		Bubble.speedx = -Bubble.speedx;
		Bubble.speedx -= 5; // going up faster
	}

	if (
		WhiteL.x <= (Bubble.x + Bubble.diam)
		&& Bubble.x <= (WhiteL.x + WhiteLImage.width)
		&& WhiteL.y <= (Bubble.y + Bubble.diam)
		&& Bubble.y <= (WhiteL.y + WhiteLImage.height)
	) {//bounce
		Bubble.x = WhiteL.x + WhiteLImage.width + Bubble.diam; //move to the edge of the paddle
		Bubble.speedx = -Bubble.speedx;
		Bubble.speedx += 5; // going up faster
	}

	// Did the bubble hit the red wall?
	if(Bubble.x > canvas.width-Bubble.diam) {
		InPlay = false;
		WhiteScore += 1;
	}
	
	// Did the bubble hit the white wall?
	if(Bubble.x < 0+Bubble.diam) {
		InPlay = false;
		RedScore += 1;
	}
	
};

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