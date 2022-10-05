'use strict';

module.exports = (socket) => (payload) => {

  console.log(`in transit ${payload.order.orderId}`);

  socket.emit('TRANSIT', payload);
};
