const express = require("express");
const path = require("path");

function initServer(port) {
  // use express to make server
  const app = express();

  // allow Express to parse JSON data in the request body
  app.use(express.json());

  // get user by id endpoint
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../asset/index.html"));
  });

  // start server
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

module.exports = {
  initServer: initServer,
};
