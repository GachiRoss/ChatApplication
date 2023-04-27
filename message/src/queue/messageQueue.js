const amqplib = require("amqplib/callback_api");

const queue = "oldMessages";
var connection;

amqplib.connect("amqp://message-archive-queue", (err, conn) => {
  if (err) throw err;
  connection = conn;
});

const sendQueue = (message) => {
  // Sender
  connection.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(queue);

    ch1.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  });
};

module.exports = {
  sendQueue: sendQueue,
};
