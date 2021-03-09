const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts"
  },
  cause: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Causes"
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
