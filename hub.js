'use strict';

const eventPool = require('./src/eventPool');
const vendorHandler = require('./src/handlers/vendor');
const driverHandler = require('./src/handlers/driver');
const Chance = require('chance');

const chance = new Chance();

eventPool.on('PICKUP', driverHandler);
eventPool.on('TRANSIT', vendorHandler);
eventPool.on('DELIVERY', vendorHandler);


setInterval(() => {
  let order = {
    store: chance.company(),
    orderId: chance.guid({version: 3}),
    name: chance.name(),
    address: chance.address(),

  };
  console.log('----new order begins----');
  eventPool.emit('PICKUP', {order});
}, 5000);
