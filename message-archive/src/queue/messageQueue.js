const amqplib = require("amqplib/callback_api");
const controller = require("../handler/messageController");
const queue = "oldMessages";

const oldMessages = () => {
  amqplib.connect("amqp://message-archive-queue", (err, conn) => {
    if (err) throw err;

    // Listener
    conn.createChannel((err, ch2) => {
      if (err) throw err;

      ch2.assertQueue(queue);

      ch2.consume(queue, (msg) => {
        if (msg !== null) {
          console.log(msg.content.toString());
          ch2.ack(msg);
          controller.createMessage(msg.content.toString());
        } else {
          console.log("Consumer cancelled by server");
        }
      });
    });
  });
};

module.exports = {
  oldMessages: oldMessages,
};
