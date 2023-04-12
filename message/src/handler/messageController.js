const db = require("../database/messageDatabase");

// create Message endpoint controller function
const createMessage = async (req, res) => {
  // get the message data from the request body
  const message = req.body;

  // TODO: correct Message BODY

  // validation of correct JSON body
  if (
    message.message_from == undefined ||
    message.message_to == undefined ||
    message.message == undefined
  ) {
    res.send("you are missing a parameter");
    return;
  }

  // save message to the database
  await db.executeQuery(
    `INSERT INTO "messages" ("message_from", "message_to", "message") VALUES ($1, $2, $3)`,
    [message.message_from, message.message_to, message.message]
  );

  // return the saved message
  res.send(message);
};

// create endpoint to get a message by id
const getMessage = async (req, res) => {
  // get id from url
  const id = req.params.id;

  // get message from the database
  const message = await db.executeQuery(
    `SELECT * FROM "messages" WHERE "id" = $1`,
    [id]
  );

  // return first message from querydata
  res.send(message[0]);
};

const getConversation = async (req, res) => {
  // get the ids from data in the request body
  const ids = req.body.ids;

  // query to get all messages between two ids
  const messages = await db.executeQuery(
    `SELECT * FROM "messages" 
    WHERE
    "message_from" = $1 AND "message_to" = $2
    OR
    "message_from" = $2 AND "message_to" = $1`,
    ids
  );

  // return messages
  res.send(messages);
};

module.exports = {
  createMessage: createMessage,
  getMessage: getMessage,
  getConversation: getConversation,
};
