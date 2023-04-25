const websocket = require("../websocket/websocketServer");

// create endpoint for sent message to websocket service
const messageCreated = (req, res) => {
  // get the message from the request body
  const message = req.body;

  websocket.broadcastMessage(message);

  // return the saved message
  res.send(message);
};

module.exports = {
  messageCreated: messageCreated,
};
