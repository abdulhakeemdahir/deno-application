const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
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

const messagesSchema = new Schema(
  {
    sender: {
      type: Scheme.Types.ObjectId,
      ref: "User"
    },
    message: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
const Message = mongoose.model("Message", messagesSchema);

module.exports = Conversation;
module.exports = Message;
