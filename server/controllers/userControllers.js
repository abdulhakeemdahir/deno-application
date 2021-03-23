const { User } = require("../models");
const { createPassword } = require("../config/bcrypt.js");

module.exports = {
  getUser: async () => {
    try {
      const user = await User.findById({ username: req.body.username })
        .select("firstName lastname username email role profileImg bannerImg")
        .populate([
          {
            path: "following",
            select: "firstName",
            model: "User"
          },
          {
            path: "followers",
            select: "firstName",
            model: "User"
          },
          {
            path: "posts",
            model: "Post",
            populate: {
              path: "author",
              select: "firstName",
              model: "User",

              path: "likes",
              model: "User",
              populate: {
                path: "user",
                select: "firstName",
                model: "User"
              },

              path: "comments",
              model: "Comment",
              populate: {
                path: "user",
                select: "firstName",
                model: "User"
              }
            }
          },
          {
            path: "cause",
            model: "Causes"
          }
        ])
        .exec();
      res.status(200).json(user);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { firstName, email, password, username, lastname } = req.body;

      const updateUser = {};

      if (firstName) {
        updateUser.firstName = firstName;
      }
      if (email) {
        updateUser.email = email;
      }
      if (password) {
        updateUser.password = await createPassword(password);
      }
      if (username) {
        updateUser.username = username;
      }
      if (lastname) {
        updateUser.lastname = lastname;
      }
      await User.findByIdAndUpdate({ _id: req.params.id }, updateUser);
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndRemove({ _id: req.params.id });
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  updatePassword: async () => {
    const hash = await createPassword(req.body.password);
    try {
      await User.findOneAndUpdate({ _id: req.params.id }, { password: hash });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
