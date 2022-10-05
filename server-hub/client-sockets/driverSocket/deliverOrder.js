'use strict';

module.exports = (socket) => (payload) => {

  setTimeout(() => {
    console.log(`delivered ${payload.order.orderId}`);
    socket.emit('DELIVERY', payload);
  }, 3000);
  // console.log('delivered', payload);

  // socket.emit('DELIVERY', payload);
};
