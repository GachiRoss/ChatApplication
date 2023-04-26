const express = require("express");
const controller = require("./messageController");
const bodyParser = require("body-parser");
const amqp = require("amqplib/callback_api");

function initServer(port) {
  // use express to make server
  const app = express();

  // allow Express to parse JSON data in the request body
  app.use(express.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // create message endpoint
  app.post("/message", controller.createMessage);

  // get message by id endpoint
  app.get("/message/:id", controller.getMessage);

  // get all messages
  app.get("/conversation/:senderid/:recieverid", controller.getConversation);

  // delete old message by id endpoint
  app.delete("/message/remove/:id", controller.removeMessage);

  // start server
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

module.exports = {
  initServer: initServer,
};
