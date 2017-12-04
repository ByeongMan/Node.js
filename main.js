var http = require("http");
var fs = require('fs');
var url = require('rul');

var server = http.createServer(function(req, res){
  var pathname = url.parse(req.url).pathname;
  if(pathname == "/") pathname = "./index.html";
  else pathname = "." + pathname;
  fs.readFile(pathname, function(err, data){
    if(err) {
      res.wirteHeader(500);
      res.end("Error");
    } else {
      res.wirteHeader(200);
      res.end(data);
    }
  });
});

server.listen(8081);
