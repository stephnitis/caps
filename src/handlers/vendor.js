'use strict';

let eventPool = require('../eventPool');
const Chance = require('chance');

const chance = new Chance();

eventPool.on('PICKUP', vendorHandler);

// module.exports = (payload) => {
//   console.log(`thank you ${payload.order.name}`);
// };

setInterval(() => {
  const order = {
    store: chance.company(),
    orderId: chance.guid({version: 3}),
    name: chance.name(),
    address: chance.address(),
  };

  console.log('----new order begins----');
  eventPool.emit('PICKUP', {order});
}, 5000);

function vendorHandler(payload) {
  setTimeout(() => {
    console.log(`Please Pickup ${payload.order.orderId}`);
    eventPool.emit('PICKUP', payload);
  }, 500);
}


module.exports = vendorHandler;
