'use strict';

const CapsClient = require('../lib/capsClient');
const vendor = new CapsClient('1-800-Flowers');

const { Chance } = require('chance');

const chance = new Chance();

vendor.subscribe('DELIVERED', (payload) => {
  console.log(`Order: "${payload.order.orderId}" Received From 1-800-Flowers`);
  vendor.publish('RECEIVED', payload);
});

setInterval(() => {
  const order = {
    store: chance.company(),
    orderId: chance.guid({ version: 3 }),
    name: chance.name(),
    address: chance.address(),
  };
  console.log('----new order begins----');
  vendor.publish('PICKUP', { order });
}, 5000);

