  var canvas;
  var ctx;
  var canvasWidth = $("canvas").width();
  var canvasHeight = $("canvas").height();
  var count = 0;

  var circleR = canvasWidth/2;
  var timeout = 0;
  var often = 3;

  function init(){
  	if (location.hash)
  	canvas = $("canvas")[0];
  	ctx = canvas.getContext("2d");
  	drawLines();
  }

    function drawLines() {
      ctx.fillStyle="#181818";
    	ctx.fillRect(0,0,canvasWidth,canvasHeight);
    	ctx.translate(canvasWidth/2,canvasHeight/2);
    	for (var i = 0; i < 25; i++) {
    		for (var a = -45; a <= 45; a+=often) {
    			setTimeout("drawTimeout("+a+");",100 * timeout);
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
  		ctx.strokeStyle= "rgb(200,200,200)";
  		ctx.lineWidth=1;
  	} else if (a == 0) {
  		ctx.strokeStyle="rgb(90,90,90)";
  		ctx.lineWidth=0.5;
  	} else {
  		ctx.strokeStyle= changeColor(40, 80, Math.PI/4, 0, Math.PI/(2/3), Math.PI);
  		ctx.lineWidth=0.2;
  	}
  	ctx.stroke();
  	ctx.rotate((Math.PI/180)*15);
  }
