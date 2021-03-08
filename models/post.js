const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  content: {
    type: String,
    trim: true,
    required: [true, "Post cannot be blank"]
  },
  date: { type: Date, default: Date.now },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments"
    }
  ]
});

postSchema.methods.handleLike = async function(userId) {
  let i = this.likes.findIndex(like => like.toString() === userId.toString());

  if (i === -1) {
    this.likes.push(userId);
  }
};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
