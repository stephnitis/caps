'use strict';

const eventPool = require('./src/eventPool');
const vendorHandler = require('./src/handlers/vendor');
const driverHandler = require('./src/handlers/driver');
const Chance = require('chance');

const chance = new Chance();

let customer = {
  name: chance.name(),
  address: chance.address(),
};


eventPool.on('PICKUP', driverHandler);
eventPool.on('TRANSIT', vendorHandler);
eventPool.on('DELIVERY', vendorHandler);


setInterval(() => {
  let customer = {
    name: chance.name(),
    address: chance.address(),
  };
  console.log('----new order begins----');
  eventPool.emit('PICKUP', {customer});
}, 5000);
