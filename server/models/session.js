const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  _id: String,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  username: String
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
