'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002/caps');

const createTransitOrder = require('./transitOrder');
const transitOrder = createTransitOrder(socket);

socket.emit('JOIN', 'driver');

socket.on('connect', () => {
  console.log(socket.id);

});

socket.on('PICKUP', transitOrder);

socket.on('disconnect', () => {
  console.log(socket.id);
});


