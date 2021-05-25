/* eslint-disable indent */
const { User, Post, Cause, Hashtag } = require("../models");
const populateBy = require("./utils/populateBy");

module.exports = {
  getSearchResults: async (req, res) => {
    try {
      const { action, search } = req.params;

      const searchRegex = new RegExp(search);

      const find = {
        ["User"]: async () => {
          return await User.find({
            $or: [
              {
                username: { $regex: searchRegex, $options: "i" }
              },
              {
                firstName: {
                  $regex: searchRegex,
                  $options: "i"
                }
              },
              { lastname: { $regex: searchRegex, $options: "i" } }
            ]
          }).select(
            "firstName lastname username email role profileImg bannerImg following followers posts bio causes address website phoneNumber orgName"
          );
        },
        ["Posts"]: async () => {
          return await Post.find({
            $or: [
              { title: { $regex: searchRegex, $options: "i" } },
              { content: { $regex: searchRegex, $options: "i" } }
            ]
          }).populate(populateBy("post"));
        },
        ["Causes"]: async () => {
          return await Cause.find({
            $or: [
              { title: { $regex: searchRegex, $options: "i" } },
              { content: { $regex: searchRegex, $options: "i" } }
            ]
          })
            .sort({ date: -1 })
            .populate(populateBy("causes"));
        },
        ["Hashtags"]: async () => {
          return await Hashtag.find({
            hashtag: { $regex: searchRegex, $options: "i" }
          }).populate(populateBy("hashtag"));
        }
      };

      const response = await find[action]();

      res.status(200).json(response);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
