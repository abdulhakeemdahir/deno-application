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
    user.username = socket.username;
  });

  socket.on("chatroom", async userId => {
    const conversations = await Conversation.find({
      participants: userId
    }).populate([
      {
        path: "participants",
        select: "username",
        model: "User"
      },
      {
        path: "messages",
        select: "sender content createdAt",
        model: "Message",
        populate: [
          {
            path: "sender",
            select: "username",
            model: "User"
          }
        ]
      }
    ]);

    socket.emit("get-convos", conversations);
  });

  socket.on("join:room", async name => {
    const roomToLeave = Object.keys(socket.rooms)[1];

    if (roomToLeave) {
      socket.leave(roomToLeave);
    }

    const conversation = await Conversation.findOne({ name }).populate([
      {
        path: "participants",
        select: "username",
        model: "User"
      },
      {
        path: "messages",
        select: "sender content createdAt",
        model: "Message",
        populate: [
          {
            path: "sender",
            select: "username",
            model: "User"
          }
        ]
      }
    ]);

    socket.join(name);

    socket.emit("get-convo", conversation);
  });

  socket.on("create:room", async ({ name, participants }) => {
    const search = await Conversation.findOne({ name });

    if (search) {
      return console.log("Convo already made.");
    }

    const newConvo = await Conversation.create({
      name,
      participants
    });
    console.log("newConvo", newConvo);
    socket.to(name).emit("get-messages", newConvo);
    socket.join(name);
  });

  socket.on("get-messages", async name => {
    const conversation = await Conversation.findOne({ name }).populate([
      {
        path: "messages",
        model: "Message"
      }
    ]);

    socket.emit("set-messages", conversation);
  });

  socket.on(
    "send-message",
    async ({ content, to, parentId, sender, isPost }) => {
      if (!isPost) {
        const newMessage = await Message.create({
          sender,
          content
        });
        const newConvo = await Conversation.findByIdAndUpdate(
          { _id: parentId },
          { $push: { messages: [{ _id: newMessage.id }] } }
        ).populate([
          {
            path: "participants",
            select: "username",
            model: "User"
          },
          {
            path: "messages",
            select: "sender content createdAt",
            model: "Message",
            populate: [
              {
                path: "sender",
                select: "username",
                model: "User"
              }
            ]
          }
        ]);
        console.log(newMessage);
        socket.emit("update-chat", { newMessage, newConvo });
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
