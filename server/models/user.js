const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const bcrypt = require("bcryptjs");

const option = { discriminatorKey: "org" };

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      //validate: [validateEmail, "Please fill a valid email address."],
      match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    password: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      trim: true
    },
    uuid: {
      type: String,
      required: false
    },
    role: {
      type: String,
      enum: ["Organization", "Personal"],
      required: [true, "Must choose a role."]
    },
    verified: {
      type: Boolean
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Posts"
      }
    ],
    causes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cause"
      }
    ],
    profileImg: {
      type: String
    },
    bannerImg: {
      type: String
    },
    socketId: {
      type: String
    }
  },
  { timestamps: true }
);

const organizationSchema = new Schema({
  causes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Causes"
    }
  ],
  orgName: {
    type: String,
    required: false,
    trim: true
  }
});

const User = mongoose.model("User", userSchema);
const Organization = User.discriminator(
  "Organization",
  organizationSchema,
  option
);

module.exports = { User, Organization };
