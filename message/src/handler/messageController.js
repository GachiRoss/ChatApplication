const db = require("../database/messageDatabase");
const axios = require("axios");

// create Message endpoint controller function
const createMessage = async (req, res) => {
  // get the message data from the request body
  const message = req.body;

  // TODO: correct Message BODY

  // validation of correct JSON body
  if (
    message.senderid == undefined ||
    message.recieverid == undefined ||
    message.message == undefined
  ) {
    res.send("you are missing a parameter");
    return;
  }

  // save message to the database
  await db.executeQuery(
    `INSERT INTO "messages" ("senderid", "recieverid", "message") VALUES ($1, $2, $3)`,
    [message.senderid, message.recieverid, message.message]
  );

  var url = "http://gateway/websocket/message";
  axios({
    method: "post",
    url: url,
    data: message,
  });

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
  const senderid = req.params.senderid;
  const recieverid = req.params.recieverid;

  // validation of correct JSON body
  if (senderid == undefined || recieverid == undefined) {
    res.send("you are missing a parameter");
    return;
  }

  // query to get all messages between two ids
  const messages = await db.executeQuery(
    `SELECT * FROM "messages" 
    WHERE
    "senderid" = $1 AND "recieverid" = $2
    OR
    "senderid" = $2 AND "recieverid" = $1
    ORDER BY "id"`,
    [senderid, recieverid]
  );

  // return messages
  res.send(messages);
};

module.exports = {
  createMessage: createMessage,
  getMessage: getMessage,
  getConversation: getConversation,
};
