  var canvas;
  var ctx;
  var canvasWidth = $("canvas").width();
  var canvasHeight = $("canvas").height();
  var count = 0;

  var circleR = canvasWidth/2;
  var timeout = 0;
  var often = 2.5;

  function init(){
  	if (location.hash)
  	canvas = $("canvas")[0];
  	ctx = $("canvas")[0].getContext("2d");
  	drawLines();
  }

    function drawLines() {
      ctx.fillStyle="#181818";
    	ctx.fillRect(0,0,canvasWidth,canvasHeight);
    	ctx.translate(canvasWidth/2,canvasHeight/2);
    	for (var i = 0; i < 25; i++) {
    		for (var a = -45; a <= 45; a+=often) {
    			setTimeout("drawTimeout("+a+");",25/* * timeout*/);
    			timeout++;
    		}
    	}
    }

  function changeColor(width, center, freq, phase1, phase2, phase3) {
    var r = Math.floor(Math.sin(freq*count+phase1)*width+center);
    var g = Math.floor(Math.sin(freq*count+phase2)*width+center);
    var b = Math.floor(Math.sin(freq*count+phase3)*width+center);
    count++;
    return "rgb("+r+", "+g+", "+b+")";
  }

  function drawTimeout(a){
  	ctx.beginPath();
  	ctx.moveTo(0,circleR);
  	var radians = Math.PI/180*a;
  	var x = (circleR * Math.sin(radians)) / Math.sin(Math.PI/2 - radians);
  	ctx.lineTo(x,0);
  	if (Math.abs(a) == 45) {
  		ctx.strokeStyle= "rgb(150,150,150)";
  		ctx.lineWidth=1;
  	} else if (a == 0) {
  		ctx.strokeStyle="rgb(60,60,60)";
  		ctx.lineWidth= .75;
  	} else {
  		ctx.strokeStyle= changeColor(105, 150, Math.PI/31, Math.PI*0, Math.PI*1/2, Math.PI);
  		ctx.lineWidth=0.25;
  	}
  	ctx.stroke();
  	ctx.rotate((Math.PI/180)*15);
  }
