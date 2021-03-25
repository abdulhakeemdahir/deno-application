const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const causeSchema = new Schema({
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
  category: {
    type: String,
    required: [false, "Causes must have a category."]
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [false]
    }
  ],
  hashtags: {
    type: Schema.Types.ObjectId,
    ref: "Hashtags"
  }
});

causeSchema.methods.handleLike = async function(userId) {
  // Assign "this" to the const "post for better definition of what is happening."
  const cause = this;

  //   Our index "i" is going to see if there the user's ID matches one that is already liked.
  const i = cause.likes.findIndex(
    like => like.toString() === userId.toString()
  );

  // If i returns -1 then we are going to push the user's ID into the causes likes. Otherwise it is going to splice i from its array index removing the user from the likes array.
  i === -1 ? cause.likes.push(userId) : cause.likes.splice(i, 1);

  await cause.save();
  return cause;
};

const Cause = mongoose.model("Cause", causeSchema);

module.exports = Cause;
