const express = require("express");
const pg = require("pg");

main();

async function main() {
  await migration();

  // start server
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

async function executeQuery(query, values) {
  // create a new database client
  const database = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

  // connect to database
  await database.connect();

  // execute query
  const res = await database.query(query, values);

  // close connection
  await database.end();

  // return rows
  return res.rows;
}

async function migration() {
  // create user table if not exist already
  await executeQuery(`
    CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(16) NOT NULL UNIQUE,
        "firstname" VARCHAR(16) NOT NULL,
        "lastname" VARCHAR(16) NOT NULL,
        "birthdate" BIGINT NOT NULL
      );
  `);

  // print succes message
  console.log("Succesfully migrated database");
}

// use express to make server
const app = express();

const port = 3000;

// allow Express to parse JSON data in the request body
app.use(express.json());

// create endpoint to create a new user
app.post("/user", async (req, res) => {
  // get the user data from the request body
  const user = req.body;

  // validation of correct JSON body
  if (!user.username || !user.firstname || !user.lastname || !user.birthdate) {
    res.send("you are missing a parameter");
    return;
  }

  // save the user to the database
  await executeQuery(
    `INSERT INTO "users" ("username", "firstname", "lastname", "birthdate") VALUES ($1, $2, $3, $4)`,
    [user.username, user.firstname, user.lastname, user.birthdate]
  );

  // return the saved user
  res.send(user);
});

// create endpoint to get a user by id
app.get("/user/:id", async (req, res) => {
  // get id from url
  const id = req.params.id;

  // TODO: validate id

  // get user from the database
  const users = await executeQuery(`SELECT * FROM "users" WHERE "id" = $1`, [
    id,
  ]);

  res.send(users[0]);
});

function createUser(user) {
  // connect to the database
  database.connect();

  database.query(`INSERT INTO "users"`);
}
