$(document).ready(function(){
  var isDraw = false; // 클릭 하고 있는지?
  var cX = new Array(); // X 좌표 record
  var cY = new Array(); // Y 좌표 record
  var isDragging = new Array();

  var can = document.getElementById('canvas');
  var cansize = can.getBoundingClientRect();
  var ctx = can.getContext('2d');

  can.addEventListener('mousedown', function(e){
    isDraw = true;
    pushArray(e.pageX-this.offsetLeft, e.pageY-this.offsetTop);
    draw();
  });

  can.addEventListener('mousemove', function(e){
    if(isDraw){
      pushArray(e.pageX-this.offsetLeft, e.pageY-this.offsetTop, true);
      draw();
    }
  });

  can.addEventListener('mouseleave', function(e){
    isDraw = false;
  });

  can.addEventListener('mouseup', function(e){
    isDraw = false;
  });

  function draw(x, y){
    for(var i=0; i<cX.length; i++){
      ctx.beginPath();
      if(i&&isDragging[i]){
        ctx.moveTo(cX[i-1], cY[i-1]);
      } else {
        ctx.moveTo(cX[i]-1, cY[i]);
      }
      ctx.lineTo(cX[i], cY[i]);
      ctx.closePath();
      ctx.stroke();
    }
  }

  function pushArray(x, y, drag){
    cX.push(x);
    cY.push(y);
    isDragging.push(drag);
  }
});
