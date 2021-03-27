/* eslint-disable indent */
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const { User, Conversation, Message, Post } = require("./models");
const PORT = process.env.PORT || 3001;
const mongodb = require("./config/options")("mongodb");

// Cloudinary
// const { cloudinary } = require("../utils/cloudinary");

// Create server
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

// Define middleware here
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
    socket.username = user.username;
    console.log(socket.id);
  });

  socket.on("chatroom", async userId => {
    console.log(socket.rooms);
    const conversations = await Conversation.find({
      participants: userId
    })
      .populate([
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
      ])
      .sort({ updatedAt: -1 });

    if (conversations.length) {
      socket.join(conversations[0].name);
    }

    socket.emit("get-convos", conversations);
  });

  socket.on("join:room", async name => {
    const roomToLeave = Object.keys(socket.rooms)[1];

    if (roomToLeave) {
      socket.leave(roomToLeave);
    }

    socket.join(name);

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

    socket.emit("get-newConvo", newConvo);
    socket.join(newConvo.name);
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

  socket.on("send-message", async payload => {
    if (!payload.isPost) {
      const createMessage = await Message.create({
        sender: payload.sender,
        content: payload.content
      });
      const newMessage = await Message.findById(createMessage._id).populate([
        {
          path: "sender",
          select: "username",
          model: "User"
        }
      ]);
      const newConvo = await Conversation.findByIdAndUpdate(
        { _id: payload.parentId },
        { $push: { messages: [{ _id: createMessage.id }] } }
      ).populate([
        {
          path: "participants",
          select: "username _id socketId",
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

      socket.join(newConvo.name);

      socket.emit("update-chat", { newMessage, newConvo });
      io.in(newConvo.name).emit("update-chat", {
        newMessage,
        newConvo
      });
      return;
    }

    if (payload.isPost) {
      const posts = await Post.find({})
        .sort({ date: -1 })
        .populate([
          {
            path: "author",
            select: "firstName",
            model: "User"
          },
          {
            path: "hashtags",
            model: "Hashtag"
          },
          {
            path: "likes",
            select: "firstName",
            model: "User"
          },
          {
            path: "comments",
            model: "Comment",
            options: { sort: { date: -1 } },
            populate: {
              path: "user",
              select: "firstName",
              model: "User"
            }
          }
        ]);

      io.emit("update-post", posts);
      return;
    }
  });

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
