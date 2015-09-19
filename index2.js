var dualShock  = require('dualshock-controller');
var controller = dualShock(
{
config:"dualShock3",
accelerometerSmoothing: true,
analogStickSmoothing: false
});

controller.on('error', function(data)
{

	console.log("ERR");
	console.log(data);
});

controller.on('left:move', function(data)
{
	console.log("left");
	console.log(data);
});
