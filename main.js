var http = require("http");
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res){
  var pathname = url.parse(req.url).pathname;
  if(pathname == "/") pathname = "./index.html";
  else pathname = "." + pathname;
  fs.readFile(pathname, function(err, data){
    if(err) {
      res.writeHeader(500);
      res.end("Error");
    } else {
      res.writeHeader(200);
      res.end(data);
    }
  });
});

server.listen(8081);

var Users = new Array();

var io = require('socket.io')(server);
io.on("connection", function(socket){

  Users.push(socket.id);

  socket.on("draw", function(data){
    socket.broadcast.emit("draw", data);
  });

  socket.on("disconnect", function(socket){
    Users.splice(socket.id);
  });
});
