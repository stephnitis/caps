'use strict';

let eventPool = require('../eventPool');

module.exports = (payload) => {
  console.log('Driver has package in transit', payload);
  console.log('Driver has delivered package', payload);
};
