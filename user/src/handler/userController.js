const db = require("../database/userDatabase");

// create user endpoint controller function
const createUser = async (req, res) => {
  // get the user data from the request body
  const user = req.body;

  // validation of correct JSON body
  if (
    user.username == undefined ||
    user.firstname == undefined ||
    user.lastname == undefined ||
    user.birthdate == undefined
  ) {
    res.send("you are missing a parameter");
    return;
  }

  // save the user to the database
  await db.executeQuery(
    `INSERT INTO "users" ("username", "firstname", "lastname", "birthdate") VALUES ($1, $2, $3, $4)`,
    [user.username, user.firstname, user.lastname, user.birthdate]
  );

  // return the saved user
  res.send(user);
};

// create endpoint to get a user by id
const getUser = async (req, res) => {
  // get id from url
  const id = req.params.id;

  // TODO: validate id

  // get user from the database
  const users = await db.executeQuery(`SELECT * FROM "users" WHERE "id" = $1`, [
    id,
  ]);

  res.send(users[0]);
};

module.exports = {
  createUser: createUser,
  getUser: getUser,
};
