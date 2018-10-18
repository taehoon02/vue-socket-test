let http = require('http');
let url = require('url');
let fs = require('fs');

let server = http.createServer(function(req, res) {
  let path = url.parse(req.url).pathname;

  switch (path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Hey, have you heard about our <a href="/signup.html">signup page</h1>');
      res.end();
      break;

    case '/signup.html':
      fs.readFile(__dirname + path, function(error, data) {
        if (error) {
          res.writeHead(404);
          res.write("opps this doesn't exist - 404");
          res.end();
        } else {
          res.writeHead(200, {"Content-Type": "text/html"});
          res.write(data, "utf8");
          res.end();
        }
      });
      break;
    default:
      res.writeHead(404);
      res.write("opps this doesn't exist - 404");
      res.end();
      break;
  }
});

server.listen(8000);

let io = require('socket.io').listen(server);

io.set('log level', 1);

io.sockets.on('connection', function(socket){
  setInterval(function(){
    socket.emit('stream', {'title': "A new title via Socket.IO!"});
  }, 1000);
});
