$(document).ready(function(){
  var socket = io();

  var isDraw = false; // 클릭 하고 있는지?
  var cX = new Array(); // X 좌표 record
  var cY = new Array(); // Y 좌표 record
  var isDrawing = new Array(); // 시작.
  var Users = new Array(); // 서버 유저 체크

  var can = document.getElementById('canvas');
  var cansize = can.getBoundingClientRect();
  var ctx = can.getContext('2d');

  can.addEventListener('mousedown', function(e){
    isDraw = true;
    pushArray(e.layerX, e.layerY);
    draw();
  });

  can.addEventListener('mousemove', function(e){
    if(isDraw){
      pushArray(e.layerX, e.layerY, true);
      draw();
      if(cX.length % 10 == 0){
        socket.emit("draw", get_data()); // 실시간으로 보여주기 위함.
      }
    }
  });

  can.addEventListener('mouseleave', function(e){
    isDraw = false;
  });

  can.addEventListener('mouseup', function(e){
    isDraw = false;
    socket.emit("draw", get_data());
  });

  function draw(x, y){
    for(var i=0; i<cX.length; i++){
      ctx.beginPath();
      if(i&&isDrawing[i]){
        ctx.moveTo(cX[i-1], cY[i-1]);
      } else { // 마우스 클릭 마지막 지점.
        ctx.moveTo(cX[i]-1, cY[i]);
      }
      ctx.lineTo(cX[i], cY[i]);
      ctx.closePath();
      ctx.stroke();
    }
  }

  function pushArray(x, y, drag){ // 각 배열에 추가
    cX.push(x);
    cY.push(y);
    isDrawing.push(drag);
  }

  function get_data(){ // 서버에 보낼 데이터 get
    return {
      id : socket.id,
      x : cX,
      y : cY,
      'isDrawing' : isDrawing
    }
  }

  socket.on("draw", function(data){ // 누가 그렸을 때
    cX = $.merge(cX, data.x); // $.merge or concat
    cY = $.merge(cY, data.y);
    isDrawing = $.merge(isDrawing, data.isDrawing);
    draw();
  });

});
