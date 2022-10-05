'use strict';

module.exports = (socket) => (payload) => {

  setTimeout(() => {
    console.log(`delivered ${payload.order.orderId}`);
    socket.emit('DELIVERY', payload);
  }, 6500);
  // console.log('delivered', payload);

  // socket.emit('DELIVERY', payload);
};
