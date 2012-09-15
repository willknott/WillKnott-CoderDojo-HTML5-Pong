// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 612;
canvas.width = document.body.clientWidth;
canvas.height = 480;
canvas.height = document.body.clientHeight;
//    http://github.com/willknott
document.body.appendChild(canvas);


var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grd.addColorStop(0, '#ff0000');
grd.addColorStop(1, '#ffffff');
ctx.fillStyle = grd;


// Background
var bgReady = false;
window.onload = function () {
//different way to create a function
bgReady = true;
};



// Draw everything
var render = function () {
ctx.fillStyle = 'rgba(00, 00, 55, 0.6)';
ctx.fillStyle = grd;
ctx.fillRect (0, 0, canvas.width, canvas.height);
}

// The main game loop
var main = function () {
render();
};
// Let's play this game!
setInterval(main, 1); // Execute as fast as possible