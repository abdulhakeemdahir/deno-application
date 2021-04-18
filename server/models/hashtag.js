const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hashtagSchema = new Schema(
  {
    hashtag: [String],
    posts: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },

    causes: {
      type: Schema.Types.ObjectId,
      ref: "Cause"
    }
  },
  {
    timestamps: true
  }
);

const Hashtag = mongoose.model("Hashtag", hashtagSchema);

module.exports = Hashtag;
