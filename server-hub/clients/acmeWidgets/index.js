'use strict';

const CapsClient = require('../lib/capsClient');
const vendor = new CapsClient('Acme Widgets');

const { Chance } = require('chance');

const chance = new Chance();

vendor.subscribe('DELIVERED', (payload) => {
  console.log(`Order: "${payload.order.orderId}" Received From Acme Widgets`);
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
}, 9000);

