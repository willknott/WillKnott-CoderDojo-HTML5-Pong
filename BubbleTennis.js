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

var bgReady = false;
window.onload = function () {
//different way to create a function
bgReady = true;
};

// Draw everything
var render = function () {
ctx.fillStyle = grd;
ctx.fillRect (0, 0, canvas.width, canvas.height);
}

// The main game loop
var main = function () {
render();
};

// Let's start this game!
setInterval(main, 1); // Execute as fast as possible

//use google / bing / yahoo / etc to find out about "Request Animation Javascript"