document.addEventListener
(
	'visibilitychange',
	function(e)
	{
		console.log
		(
			'hidden:' + document.hidden,
			'state:' + document.visibilityState
		)
	},
	false
);

/////

if (navigator.onLine)
{
	console.log('ONLINE!');
}
else
{
	console.log('Connection flaky');
}

window.addEventListener
(
	'online',
	function(e)
	{
		// Re-sync data with server.
	},
	false
);

window.addEventListener
(
	'offline',
	function(e)
	{
		// Queue up events for server.
	},
	false
);

/////

function enterFullscreen()
{
	var elem = document.querySelector('body');
	elem.onwebkitfullscreenchange = function(e)
	{
    	console.log("Entered fullscreen!");
		elem.onwebkitfullscreenchange = onFullscreenExit;
	};
	elem.webkitRequestFullScreen();
}

/////

window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

function draw(time)
{
	// update models.
	paintScene(canvas);
	window.requestAnimationFrame(draw, canvas);
}
draw();

/////

try
{
	if(typeof(window.localStorage) != 'undefined')
	{
		//use localStorage
		window.appStorage = window.localStorage;
	}
	else
	{
		//use Backbone
		window.appStorage = window.backboneStorage;

		throw "window.localStorage, not defined";
	}
}
catch(err)
{
	output_str("store_local,error," + err);
}

window.localStorage.setItem(key, value);
window.localStorage.getItem(key);
window.localStorage.removeItem(key);
window.localStorage.clear();


/////

var ctx = new window.webkitAudioContext();

function playSound(arrayBuffer) { // Obtain arrayBuffer from XHR2.
  ctx.decodeAudioData(arrayBuffer, function(buffer) {
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    src.looping = false;
    src.connect(ctx.destination);
    src.noteOn(0); // Play immediately.
  }, function(e) {
    console.log(e);
  });
}

/////

var ctx = new webkitAudioContext();
var analyser = ctx.createAnalyser();

function initAudio(arrayBuffer) {
  ctx.decodeAudioData(arrayBuffer, function(buffer) {
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(analyser); // src -> analyser -> destination
    analyser.connect(ctx.destination);
    render(src);
  }, function(e) {
    console.log('Error decoding audio file', e);
  });
}

function render(src) {
  (function callback(timeStamp) {
    var byteData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(byteData);

    // draw byteData to <canvas> visualization...

    window.requestAnimationFrame(callback, src);
  })();
}

/////

<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">