'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const uuid = require('uuid').v4;

const server = new Server(PORT);
const caps = server.of('/caps');
const vendorQueue = new Queue();
const driverQueue = new Queue();

server.on('connection', (socket) => {
  console.log(socket.id);

});

caps.on('connection', (socket) => {

  socket.on('JOIN', (queueId) => {
    console.log(`Joined the ${queueId} room`);
    // socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  socket.on('PICKUP', (payload) => {
    logEvent('PICKUP', payload);
    let currentQueue = driverQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = driverQueue.store(payload.queueId, new Queue());
      currentQueue = driverQueue.read(queueKey);
    }
    currentQueue.store(payload.orderId, payload);
    caps.emit('PICKUP', payload);
  });

  socket.on('DELIVERED', (payload) => {
    logEvent('DELIVERED', payload);
    let currentQueue = driverQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('No Queue Created');
    }
    currentQueue.store(payload.orderId, payload);
    caps.emit('DELIVERED', payload);
  });

  socket.on('RECEIVED', (payload) => {
    logEvent('RECEIVED', payload);
    let currentQueue = vendorQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('No Queue Created');
    }
    let order = currentQueue.remove(payload.orderId);
    //payload should have client id event name and message id
    socket.to(payload.queueId).emit('RECEIVED', order);
  });

  socket.on('GET_ALL', (payload) => {
    console.log('This Happened');
    let currentQueue = driverQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(orderId => {
        caps.emit('DELIVERED', currentQueue.read(orderId));
      });
    }
  });
});


function logEvent(event, payload) {
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT', { event, time, payload });
}
