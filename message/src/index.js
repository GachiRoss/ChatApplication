const handler = require("./handler/messageHandler");
const db = require("./database/messageDatabase");

const port = 3000;

// call main function
main();

// Function to migrate data then start server up
async function main() {
  await db.migration();

  // start server
  handler.initServer(port);
}
