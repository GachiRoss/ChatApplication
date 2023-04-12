const db = require("../database/friendDatabase");

// create friend endpoint controller function
const sendFriend = async (req, res) => {
  // get the friend data from the request body
  const friend = req.body;

  // validation of correct JSON body
  if (friend.senderid == undefined || friend.recieverid == undefined) {
    res.send("you are missing a parameter");
    return;
  }

  // save the friend to the database
  await db.executeQuery(
    `INSERT INTO "friends" ("senderid", "recieverid", "status") VALUES ($1, $2, $3)`,
    [friend.senderid, friend.recieverid, 0]
  );

  // return friend
  res.send(friend);
};

// create endpoint to answer friend request

const answerFriend = async (req, res) => {
  const body = req.body;

  // validation of correct JSON body
  if (
    body.senderid == undefined ||
    body.recieverid == undefined ||
    body.accepted == undefined
  ) {
    res.send("you are missing a parameter");
    return;
  }
  // Key to determine the change the status of the request
  const status = body.accepted ? 1 : 2;

  // querry to find by id and set request to accept/decline
  const friend = await db.executeQuery(
    `UPDATE "friends"
    SET "status" = $1 WHERE "senderid" = $2 AND "recieverid" = $3   `,
    [status, body.senderid, body.recieverid]
  );

  res.send(body);
};

// create endpoint to get a friends by id
const getFriends = async (req, res) => {
  // get id from url
  const id = req.params.userid;

  // TODO: validate id

  // get friends from the database
  const friends = await db.executeQuery(
    `SELECT * FROM "friends" WHERE ("senderid" = $1 OR "recieverid" = $1) AND "status" = $2`,
    [id, 1]
  );

  res.send(friends);
};

module.exports = {
  sendFriend: sendFriend,
  answerFriend: answerFriend,
  getFriends: getFriends,
};
