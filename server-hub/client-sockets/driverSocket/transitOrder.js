'use strict';

module.exports = (socket) => (payload) => {

  setTimeout(() => {
    console.log(`in transit ${payload.order.orderId}`);
    socket.emit('TRANSIT', payload);
  }, 6000);
  // console.log('in transit', payload);

  // socket.emit('TRANSIT', payload);
};
