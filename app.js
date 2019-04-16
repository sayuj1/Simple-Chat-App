// npm install -g nodemon  //installing nodemon globally
const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(4000, function(){
    console.log("Server started at port 4000");
});

//static files
app.use(express.static('public'));

//socket setup
const io = socket(server);   //telling to use this server

io.on('connection', function(socket){   //starting the connection
console.log('made socket connection', socket.id);

// Handle chat event
socket.on('chat', function(data){    //listening for chat
    io.sockets.emit('chat', data);   //sending back to all clients
 });

 socket.on('typing', function(data){   //listening for typing
    socket.broadcast.emit('typing', data);  //broadcasting to all except the current user
 });

});