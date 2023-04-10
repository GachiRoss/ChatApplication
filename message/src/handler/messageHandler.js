const express = require("express");
const controller = require("./messageController");

function initServer(port) {
  // use express to make server
  const app = express();

  // allow Express to parse JSON data in the request body
  app.use(express.json());

  // create message endpoint
  app.post("/message", controller.createMessage);

  // get message by id endpoint
  app.get("/message/:id", controller.getMessage);

  // get all messages
  app.get("/conversation", controller.getConversation);

  // start server
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

module.exports = {
  initServer: initServer,
};
