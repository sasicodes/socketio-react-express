const expressApp = require("express")();

const socketHttpServer = require("http").createServer();

const io = require("socket.io")(socketHttpServer, {
  cors: {
    // domain
    origin: "*",
  },
});

// middleware
io.use((socket, next) => {
  // you can validate anything here
  if (socket.handshake.auth.Authorization) {
    next();
  } else {
    next(new Error("no auth"));
  }
});

io.on("connection", (socket) => {
  // listening to chat event
  socket.on("chat", (payload) => {
    // responding the same payload to the chat event received
    io.emit("chat", payload);
  });
});

socketHttpServer.listen(5000, () =>
  console.log("Socket server listening on port 5000 🚀 ")
);
