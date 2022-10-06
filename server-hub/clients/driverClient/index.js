'use strict';

const CapsClient = require('../lib/capsClient');
const driver = new CapsClient('driver');

driver.publish('GET_ALL', { queueId: 'orderId'});

driver.subscribe('PICKUP', (payload) => {
  driver.publish('DELIVERED', payload);
});



