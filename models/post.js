const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  content: {
    type: String,
    trim: true,
    required: [true, "Post cannot be blank"]
  },
  date: { type: Date, default: Date.now },
  cause: [
    {
      type: Schema.Types.ObjectId,
      ref: "Causes",
      required: [false]
    }
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ],
  hashtags: {
    type: Schema.Types.ObjectId,
    ref: "Hashtag"
  }
});

postSchema.methods.handleLike = async function(userId) {
  // Assign "this" to the const "post for better definition of what is happening."
  const post = this;

  //   Our index "i" is going to see if there the user's ID matches one that is already liked.
  const i = post.likes.findIndex(like => like.toString() === userId.toString());

  // If i returns -1 then we are going to push the user's ID into the Posts likes. Otherwise it is going to splice i from its array index removing the user from the likes array.
  i === -1 ? post.likes.push(userId) : post.likes.splice(i, 1);

  await post.save();
  return post;
};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
