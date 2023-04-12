const express = require("express");
const controller = require("./friendController");

function initServer(port) {
  // use express to make server
  const app = express();

  // allow Express to parse JSON data in the request body
  app.use(express.json());

  // Send friend request endpoint
  app.post("/friend", controller.sendFriend);

  // accept friend request endpoint
  app.put("/friend", controller.answerFriend);

  // get friends by userid endpoint
  app.get("/friend/:userid", controller.getFriends);

  // start server
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

module.exports = {
  initServer: initServer,
};
