const express = require("express");
const controller = require("./messageController");
const bodyParser = require("body-parser");

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

  // create user endpoint
  app.post("/websocket/message", controller.messageCreated);

  // start server
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

module.exports = {
  initServer: initServer,
};
