const handler = require("./handler/friendHandler");
const db = require("./database/friendDatabase");

const port = 3000;

// call main function
main();

// Function to migrate data then start server up
async function main() {
  await db.migration();

  // start server
  handler.initServer(port);
}
