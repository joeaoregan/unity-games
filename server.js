/*
	Joe O'Regan
	server.js
	Unity Games
*/
const express = require("express"),
  http = require("http");
socketio = require("socket.io");

var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(express.static("static"));

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("derp", (data) => {
    socket.emit("newGame", {
      username: data.username,
      gameID: `game-${gamesPlayed}`,
    });
    console.log("derp"); // Log on server
  });

  socket.on("disconnect", function () {
    console.log("A player has been disconnected");
  });

  socket.on("message", (data) => {
    console.log("MSG - " + data.gameID + " " + data.username + ": " + data.msg);
    socket.broadcast.to(data.gameID).emit("message", data); // broadcast to everyone except this
  });
});

server.listen(port);
console.clear(); // Clear console text
console.log("Server running at http://localhost:" + port);
console.log("Press Ctrl+C to stop the server");
