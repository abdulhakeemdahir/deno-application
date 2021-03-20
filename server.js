const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const PORT = process.env.PORT || 3001;

// Create server
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(passport.initialize());
app.use(compression());

app.use(require("./routes"));

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dono", {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

io.use(async (socket, next) => {
  socket.room = socket.handshake.query.room;
  return next();
});

// Connect the client to the socket.
io.on("connection", socket => {
  console.log("User Connected: ", socket.id);
  const id = socket.handshake.query.id;
  socket.join(id);

  // socket.emit("session", {
  //   session: socket.sessionID,
  //   userID: socket.userID
  // });

  // socket.on("private", message => {
  //   socket.broadcast.to(socket.room).emit("chat", message);
  // });

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(newR => newR !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text
      });
    });
  });

  socket.on("comment", ({ post, text }) => {
    socket.broadcast.to(post).emit("update-comment-board", {
      post,
      text
    });
  });

  socket.on("disconnect", () => {
    console.log("user has left.");
  });
});

// Start the API server
server.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
