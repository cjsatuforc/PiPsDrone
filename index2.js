///Dualshock code started from:
///https://github.com/rdepena/node-dualshock-controller
var dualShock = require('dualshock-controller');

//pass options to init the controller.
var controller = dualShock(
    {
        //you can use a ds4 by uncommenting this line.
        //config: "dualshock4-generic-driver",
        //if using ds4 comment this line.
        config : "dualShock3",
        //smooths the output from the acelerometers (moving averages) defaults to true
        accelerometerSmoothing : true,
        //smooths the output from the analog sticks (moving averages) defaults to false
        analogStickSmoothing : false
    });

function s(msg)
{
	console.log(msg);
}

//make sure you add an error event handler
controller.on('error', function(data) {
	s("ERROR: "+data);
});

//add event handlers:
controller.on('left:move', function(data) {
  s("left: "+data);
});
controller.on('right:move', function(data) {
  s("right: "+data);
});
controller.on('connected', function(data) {
  s("connected: "+data);
});
controller.on('square:press', function (data) {
  s("square press: "+data);
});
controller.on('square:release', function (data) {
  s("square release: "+data);
});
