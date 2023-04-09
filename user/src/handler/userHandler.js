const express = require("express");
const controller = require("./userController");

function initServer(port) {
  // use express to make server
  const app = express();

  // allow Express to parse JSON data in the request body
  app.use(express.json());

  // create user endpoint
  app.post("/user", controller.createUser);

  // get user by id endpoint
  app.get("/user/:id", controller.getUser);

  // start server
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

module.exports = {
  initServer: initServer,
};
