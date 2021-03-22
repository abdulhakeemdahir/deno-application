const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
// Requiring passport as we've configured it
const passport = require("./config/passport");
<<<<<<< HEAD
// const { Conversation } = require("./models");
=======
const { Conversation } = require("./models");
>>>>>>> e47d2923563c2432a59d4d15dc39fc256357b5fc
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
  socket.on("adduser", username => {
    // we store the username in the socket session for this client
    socket.username = username;
  });

  socket.on("switch-convo", newConvo => {
    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as parameter.
    socket.join(newConvo);
    socket.emit("update-convo", "SERVER", "you have connected to" + newConvo);
    socket.room = newConvo;
  });

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
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
