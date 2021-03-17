const { User } = require("../models");
const { createPassword } = require("../config/bcrypt.js");

module.exports = {
  getUser: async () => {
    try {
      const user = await User.findById({ _id: req.params.id })
        .select("firstName lastname username email role profileImg bannerImg")
        .populate({
          path: "following",
          populate: {
            path: "user",
            model: "User"
          },
          path: "followers",
          populate: {
            path: "user",
            model: "User"
          },
          path: "posts",
          populate: {
            path: "user",
            model: "User"
          }
        });
      res.status(200).json(user);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  updateUser: async () => {
    try {
      await User.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  deleteUser: async () => {
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
