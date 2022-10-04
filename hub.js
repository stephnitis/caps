'use strict';

const eventPool = require('./src/eventPool');
const vendorHandler = require('./src/handlers/vendor');
const driverHandler = require('./src/handlers/driver');


eventPool.on('PICKUP', (payload) => logEvent('PICKUP', payload));
eventPool.on('PICKUP', driverHandler);
eventPool.on('TRANSIT', vendorHandler);
eventPool.on('DELIVERY', vendorHandler);


function logEvent(event, payload){
  const date = new Date();
  const time = date.toGMTString();
  console.log('EVENT', {event, time, payload});
}



// date.toDateString();
// date.toTimeString();
