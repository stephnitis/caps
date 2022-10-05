'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

const server = new Server(PORT);

const caps = server.of('/caps');

server.on('connection', (socket) => {
  console.log(socket.id);

});

caps.on('connection', (socket) => {

  socket.on('JOIN', (room) => {
    console.log(`Joined the ${room} room`);
  });

  socket.on('PICKUP', (payload) => {
    logEvent('PICKUP', payload);
    caps.emit('PICKUP', payload);
  });

  socket.on('TRANSIT', (payload) => {
    logEvent('TRANSIT', payload);
    caps.emit('TRANSIT', payload);
  });

  socket.on('DELIVERY', (payload) => {
    logEvent('DELIVERY', payload);
    caps.emit('DELIVERY', payload);
  });
});


function logEvent(event, payload) {
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT', { event, time, payload });
}
