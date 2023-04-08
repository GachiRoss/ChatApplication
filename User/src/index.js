const handler = require("./handler/userHandler");
const db = require("./database/userDatabase");

const port = 3000;

// call main function
main();

// Function to migrate data then start server up
async function main() {
  await db.migration();

  // start server
  handler.initServer(port);
}
