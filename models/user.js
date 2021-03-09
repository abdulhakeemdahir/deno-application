const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const SALT_WORK_FACTOR = 10;
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

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

module.exports = { User, Organization };
