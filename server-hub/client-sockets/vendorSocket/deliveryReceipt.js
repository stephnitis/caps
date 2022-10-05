'use strict';

module.exports = (socket) => (payload) => {

  setTimeout(() => {
    console.log(`thank you ${payload.order.name}`);
    socket.emit('DELIVERY', payload);
  }, 3000);
};
