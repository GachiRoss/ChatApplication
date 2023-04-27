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

      ch2.consume(queue, async (msg) => {
        if (msg !== null) {
          await controller.createMessage(JSON.parse(msg.content.toString()));
          ch2.ack(msg);
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
