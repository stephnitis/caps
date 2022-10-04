'use strict';

let eventPool = require('../eventPool');

module.exports = (payload) => {
  console.log(`thank you ${payload.order.name}`);
};
