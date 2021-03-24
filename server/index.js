/* eslint-disable indent */
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const { User, Conversation, Message } = require("./models");
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
  useNewUrlParser: true,
  useFindAndModify: false
});

io.use(async (socket, next) => {
  socket.room = socket.handshake.query.room;
  return next();
});

//Connect the client to the socket.
io.on("connection", socket => {
  socket.on("join:server", async username => {
    const user = await User.findOne({ username });
    user.socketId
      ? (socket.id = user.socketId)
      : User.findOneAndUpdate(username, { socketId: socket.id });
    user.socketId = socket.id;
  });

  socket.on("join:room", async name => {
    const conversation = await Conversation.findOne({ name }).populate([
      {
        path: "messages",
        model: "Message"
      }
    ]);

    socket.join(name);

    socket.emit("get-convo", conversation);
  });

  socket.on("create:room", async (roomName, participants) => {
    const newConvo = await Conversation.create({
      name: roomName,
      participants
    });
    console.log("newConvo", newConvo);
    socket.to(roomName).emit("get-messages", newConvo);
    socket.join(roomName);
  });

  socket.on(
    "send-message",
    async ({ content, to, parentId, sender, isPost }) => {
      if (!isPost) {
        console.log("is not a post");
        const response = await Message.create({
          sender,
          content
        });
        await Conversation.findByIdAndUpdate(
          { _id: parentId },
          { $push: { messages: [{ _id: response.id }] } }
        );
        console.log(response);
        socket.to(to).emit("update-chat", response);
        return;
      }

      if (isPost) {
        console.log("is a post");
        const response = await Comment.create({
          user: sender,
          post: parentId,
          content
        });
        console.log(response);
        await Post.findByIdAndUpdate(
          { _id: parentId },
          { comments: [{ id: response.id }] }
        );
        socket.to(to).emit("update-post", response);
        return;
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("user has left.");
  });
});

//Start the API server
server.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
