'use strict';

const { Chance } = require('chance');

const chance = new Chance();


module.exports = (socket) => (payload) => {
  console.log(socket.id);

  setInterval(() => {
    const order = {
      store: chance.company(),
      orderId: chance.guid({ version: 3 }),
      name: chance.name(),
      address: chance.address(),
    };
    console.log('----new order begins----');
  }, 2500);
  socket.emit('PICKUP', payload);
};


