var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

app.use(express.static('client/dist'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  socket.on('send keep', function(keep_contents) {
    io.emit('send keep', keep_contents);
  });

  socket.on('send problem', function(problem_contents) {
    io.emit('send problem', problem_contents);
  });

  socket.on('send try', function(try_contents) {
    io.emit('send try', try_contents);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
