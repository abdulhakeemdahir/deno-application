const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message"
      }
    ]
  },
  { timestamps: true }
);

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    content: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = { Conversation, Message };
