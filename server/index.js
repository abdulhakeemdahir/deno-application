const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
// Requiring passport as we've configured it
const passport = require("./config/passport");
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
const users = [];
const messages = {
  general: [],
  random: [],
  jokes: [],
  javascript: []
};
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

  socket.on("join:room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName]);
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

  // socket.on("switch-convo", newConvo => {
  //   // leave the current room (stored in session)
  //   socket.leave(socket.room);
  //   // join new room, received as parameter.
  //   socket.join(newConvo);
  //   socket.emit("update-convo", "SERVER", "you have connected to" + newConvo);
  //   socket.room = newConvo;
  // });

  // socket.on("send-message", ({ recipients, text }) => {
  //   recipients.forEach(recipient => {
  //     const newRecipients = recipients.filter(newR => newR !== recipient);
  //     newRecipients.push(id);
  //     socket.broadcast.to(recipient).emit("receive-message", {
  //       recipients: newRecipients,
  //       sender: id,
  //       text
  //     });
  //   });
  // });

  // socket.on("comment", ({ post, text }) => {
  //   socket.broadcast.to(post).emit("update-comment-board", {
  //     post,
  //     text
  //   });
  // });
});

// Start the API server
server.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
