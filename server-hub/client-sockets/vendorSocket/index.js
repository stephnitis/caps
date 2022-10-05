'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002/caps');

const createPickup = require('./createPickup');
const pickup = createPickup(socket);

socket.emit('JOIN', 'vendor');

socket.on('connect', () => {
  console.log(socket.id);

});

socket.on('connect', pickup);

socket.on('disconnect', () => {
  console.log(socket.id);
});
