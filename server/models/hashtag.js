const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hashtagSchema = new Schema({
  hashtag: [String],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts"
    }
  ],
  causes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Causes"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ]
});

const Hashtag = mongoose.model("Hashtag", hashtagSchema);

module.exports = Hashtag;
