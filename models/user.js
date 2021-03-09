const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { createPassword, comparePassword } = require("../config/bcrypt.js");
const option = { discriminatorKey: "org" };

const userSchema = new Schema({
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
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ],
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts"
    }
  ],
  profileImg: {
    type: String
  },
  bannerImg: {
    type: String
  }
});

const organizationSchema = new Schema({
  causes: [
    {
      type: mongoose.Schema.Types.ObjectId,
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

userSchema.pre(save, function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }
  //generate password
  user.password = createPassword(user.password);
  next();
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  try {
    const isMatch = comparePassword(candidatePassword, this.password);
    cb(null, isMatch);
  } catch (err) {
    if (err) {
      return cb(err);
    }
  }
};

module.exports = { User, Organization };
