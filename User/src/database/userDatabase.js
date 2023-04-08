const pg = require("pg");

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

module.exports = {
  executeQuery: executeQuery,
  migration: migration,
};
