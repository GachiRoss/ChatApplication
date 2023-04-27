const db = require("../database/messageDatabase");
const axios = require("axios");

// create Message endpoint controller function
const createMessage = async (message) => {
  // create message to db
  await db.executeQuery(
    `INSERT INTO "archiveMessages" ("senderid", "recieverid", "message" ) VALUES ($1, $2, $3)`,
    [message.senderid, message.recieverid, message.message]
  );

  // requeste message service delete oldmessage
  const url = "http://gateway/message/remove/" + message.id;
  await axios({
    url: url,
    method: "DELETE",
  });

  return;
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
    `SELECT * FROM "archiveMessages" 
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
  getConversation: getConversation,
};
