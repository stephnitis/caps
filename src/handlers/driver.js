'use strict';

let eventPool = require('../eventPool');

eventPool.on('PICKUP', driverHandler);

// module.exports = (payload) => {
//   console.log(`picked up ${payload.order.orderId}`);
//   console.log('in transit', payload);
//   console.log(`delivered ${payload.order.orderId}`);
// };

function driverHandler(payload) {
  setTimeout(() => {
    console.log(`driver picked up ${payload.order.orderId}`);
  }, 250);
  setTimeout(() => {
    console.log(`in transit ${payload.order.orderId}`);
    eventPool.emit('IN TRANSIT', payload);
  }, 500);
  setTimeout(() => {
    console.log(`delivered ${payload.order.orderId}`);
    eventPool.emit('DELIVERED', payload);
  });
}


module.exports = driverHandler;
