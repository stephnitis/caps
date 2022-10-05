'use strict';

const eventPool = require('./src/eventPool');
require('./src/handlers/vendor/vendor');
require('./src/handlers/driver/driver');

eventPool.on('PICKUP', (payload) => logEvent('PICKUP', payload));

eventPool.on('TRANSIT', (payload) => logEvent('TRANSIT', payload));

eventPool.on('DELIVERY', (payload) => logEvent('DELIVERY', payload));

function logEvent(event, payload){
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT', {event, time, payload});
}



// date.toDateString();
// date.toGMTString();
