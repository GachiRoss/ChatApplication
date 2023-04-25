const websocket = require("ws");
const wss = new websocket.WebSocketServer({ port: 2000 });

var userConnections = {};

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    ws.id = data;
    userConnections[data] = ws;
  });

  ws.on("close", function close() {
    console.log("disconnected: " + ws.id);
    if (ws.id) {
      userConnections[ws.id] = undefined;
    }
  });
});

const broadcastMessage = (message) => {
  if (userConnections[message.recieverid]) {
    userConnections[message.recieverid].send(JSON.stringify(message));
  }
};

module.exports = {
  broadcastMessage: broadcastMessage,
};
