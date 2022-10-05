'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const createDeliveryReceipt = require('./deliveryReceipt');
const deliveryReceipt = createDeliveryReceipt(socket);

const { Chance } = require('chance');

const chance = new Chance();

socket.emit('JOIN', 'vendor');

socket.on('connect', () => {
  console.log(socket.id);

  setInterval(() => {
    const order = {
      store: chance.company(),
      orderId: chance.guid({ version: 3 }),
      name: chance.name(),
      address: chance.address(),
    };
    console.log('----new order begins----');
    socket.emit('PICKUP', { order });
  }, 9000);

});

socket.on('DELIVERY', deliveryReceipt);

socket.on('disconnect', () => {
  console.log(socket.id);
});
