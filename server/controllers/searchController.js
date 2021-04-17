/* eslint-disable indent */
const { User, Post, Cause, Hashtag } = require("../models");

module.exports = {
  getSearchResults: async (req, res) => {
    try {
      const { action, search } = req.params;

      console.log(action);

      console.log(search);

      let response;

      switch (action) {
        case "User":
          response = await User.find({ username: search });
          console.log(response);
          res.status(200).json(response);
          break;

        case "Posts":
          const searchRegex = new RegExp(search);

          response = await Post.find({
            $or: [
              { title: { $regex: searchRegex, $options: "i" } },
              { content: { $regex: searchRegex, $options: "i" } }
            ]
          }).populate([
            {
              path: "author",
              select:
                "firstName lastname username email role profileImg bannerImg following followers posts bio causes address website phoneNumber orgName",
              model: "User"
            },
            {
              path: "hashtags",
              model: "Hashtag"
            },
            {
              path: "likes",
              select: "username",
              model: "User"
            },
            {
              path: "comments",
              model: "Comment",
              options: { sort: { createdAt: -1 } },
              populate: {
                path: "user",
                select: "username",
                model: "User"
              }
            }
          ]);

          res.status(200).json(response);
          break;

        case "Causes":
          response = await Cause.find({
            $or: [
              { title: { $regex: searchRegex, $options: "i" } },
              { content: { $regex: searchRegex, $options: "i" } }
            ]
          });
          res.status(200).json(response);
          break;

        case "Hashtags":
          response = await Hashtag.find({
            hashtag: { $regex: searchRegex, $options: "i" }
          });
          res.status(200).json(response);
          break;

        default:
          break;
      }
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
