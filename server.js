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

app.use(express.static("docs"));

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

const green = "\x1b[32m";
const blue = "\x1b[34m";
const cyan = "\x1b[36m";
const reset = "\x1b[0m";

console.log(
  `###################### Joe O'Regan's ######################
${blue} _  _  __ _  __  ____  _  _    ___   __   _  _  ____  ____ 
/ )( \\(  ( \\(  )(_  _)( \\/ )  / __) /  \\ ( \\/ )(  __)/ ___)
) \\/ (/    / )(   ||   )  /  ( (_ \\/ /\\ \\/ \\/ \\ ) _) \\___ \\
\\____/\\_)__)(__) (__) (__/    \\___/\\_/\\_/\\_)(_/(____)(____/${reset}
###########################################################`
);

console.log("Server running at " + green + "http://localhost:" + port + reset);
console.log("Press " + cyan + "Ctrl+C" + reset + " to stop the server");
