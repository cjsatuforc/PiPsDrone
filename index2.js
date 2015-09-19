///Dualshock code started from:
///https://github.com/rdepena/node-dualshock-controller
var dualShock = require('dualshock-controller');
///most of the drone came from Anderson 'Aqua Lad' Williams - Interned at Teleios for July-Aug, 2015.
///big up, Andy!
var arDrone = require('ar-drone');

var controller = dualShock(
    {
        config: "dualShock3",
        accelerometerSmoothing: true,
        analogStickSmoothing: false
    });

var client = arDrone.createClient();
client.animateLeds('blinkGreen', 5, 2);
client.calibrate(0);
function s(msg) {
    console.log(msg);
}

//make sure you add an error event handler
controller.on('error', function (data) {
    s("ERROR: ");
	s(data);
});

//add event handlers:
controller.on('left:move', function (data) {
    s("left: ");
    s(data);
    client.left(0.5);
});
controller.on('right:move', function (data) {
    s("right: ");
    s(data);
    client.left(0.5);
});
controller.on('connected', function (data) {
    s("connected: " + data);
});
controller.on('square:press', function (data) {
    s("square press: " + data);
    client.animateLeds('blinkGreen', 5, 2);
    client.takeoff(function () {
        hovering = true;
        console.log("flying");
        this.calibrate(0);
    });
});

controller.on('circle:press', function(data)
{
	s("circle");
	client = arDrone.createClient();
});


controller.on('triangle:press', function (data) {
    s("triangle press: " + data);
    client.front(0.5);
});

controller.on('dpadUp:press', function (data) {
    s("dpadUp press: " + data);
    client.up(0.5);    
});
controller.on('dpadRight:press', function (data) {
    s("dpadRight press: " + data);
    client.counterClockwise(0.5);
});
controller.on('dpadDown:press', function (data) {
    s("dpadDown press: " + data);
    client.down(0.5);
});
controller.on('dpadLeft:press', function (data) {
    s("dpadLeft press: " + data);
    client.clockwise(0.5);
});

controller.on('psxButton:press', function (data) {
    s("psxButton press: " + data);
    var animOptions = ['phiM30Deg', 'phi30Deg', 'thetaM30Deg', 'theta30Deg', 'theta20degYaw200deg',
       'theta20degYawM200deg', 'turnaround', 'turnaroundGodown', 'yawShake',
       'yawDance', 'phiDance', 'thetaDance', 'vzDance', 'wave', 'phiThetaMixed',
       'doublePhiThetaMixed', 'flipAhead', 'flipBehind', 'flipLeft', 'flipRight'];
    var min = 0;
    var max = animOptions.length - 1;
    var idx = Math.floor(Math.random() * (max - min)) + min;
    client.animate(animOptions[idx], 3000);

    client.animateLeds('blinkGreen', 5, 2);
});

controller.on('start:press', function (data) {
    s("start press: " + data);
    client.calibrate(0);
    client.stop();
    
});

controller.on('select:press', function (data) {
    s("start press: " + data);
    client.land();
});
