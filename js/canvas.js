  var canvas;
  var ctx;
  var canvasWidth = $("#canvas1").width();
  var canvasHeight = $("#canvas1").height();
  var count = 0;

  var circleR = canvasWidth/2;
  var timeout = 0;
  var often = 5;

  function init(canvasID, iterations, useTimeout, time){
  	canvas = $(canvasID)[0];
  	ctx = $(canvasID)[0].getContext("2d");
    canvasWidth = $(canvasID).width();
    canvasHeight = $(canvasID).height();
  	drawLines(iterations, useTimeout, time);
  }

    function drawLines(iterations, useTimeout, time) {
      ctx.fillStyle="transparent";
    	ctx.fillRect(0,0,canvasWidth,canvasHeight);
    	ctx.translate(canvasWidth/2,canvasHeight/2);
    	for (var i = 0; i < iterations; i++) {
    		for (var a = -45; a <= 45; a+=often) {
          if (useTimeout) {
      			setTimeout("drawTimeout("+a+");",time*timeout);
      			timeout++;
          } else {
            setTimeout("drawTimeout("+a+");",time*timeout);
          }
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
  		ctx.strokeStyle= changeColor(105, 150, Math.PI/10, Math.PI*0, Math.PI*1/2, Math.PI);
  		ctx.lineWidth=0.25;
  	}
  	ctx.stroke();
  	ctx.rotate((Math.PI/180)*15);
  }
