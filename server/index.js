const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const Conversation = require("./models/messenger");
// const { Conversation } = require("./models");
const PORT = process.env.PORT || 3001;
const mongodb = require("./config/options")("mongodb");

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
mongoose.connect(mongodb, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// io.use(async (socket, next) => {
//   socket.room = socket.handshake.query.room;
//   return next();
// });

// Connect the client to the socket.
io.on("connection", socket => {
  socket.on("join:server", username => {
    // we store the username in the socket session for this client
    const user = {
      username,
      id: socket.id
    };
    users.push(user);
    io.emit("new user", users);
  });

  socket.on("join:room", async (roomName, cb) => {
    const conversation = await Conversation.findOne({ name: roomName });
    socket.join(roomName);
    socket.emit("set-messages", conversation);
  });

  socket.on("send-message", ({ content, to, sender, postId, isPost }) => {
    if (isPost) {
      const payload = {
        content,
        postId,
        sender
      };
      socket.to(to).emit("new-message", payload);
    } else {
      const payload = {
        content,
        chatName: sender,
        sender
      };
      socket.to(to).emit("new-message", payload);
    }
    if (messages[postId]) {
      messages[postId].push({
        sender,
        content
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user has left.");
  });
});

// Start the API server
server.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
