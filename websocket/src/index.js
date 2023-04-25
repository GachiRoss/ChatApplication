const handler = require("./handler/messageHandler");

const port = 3000;

// call main function
main();

// Function to migrate data then start server up
async function main() {
  // start server
  handler.initServer(port);
}
