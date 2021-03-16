const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: [true, "Comment can't be blank."],
    trim: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [false]
    }
  ]
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
