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
          const regexeppe = new RegExp(search);
          console.log(regexeppe);
          response = await Post.aggregate([
            {
              content: { $regex: new RegExp(search) }
            }
          ]);
          console.log(response);
          res.status(200).json(response);
          break;

        case "Causes":
          response = await Cause.aggregate([
            {
              $match: {
                content: { $regex: new RegExp(search, "g") }
              }
            }
          ]);
          res.status(200).json(response);
          break;

        case "Hashtags":
          response = await Hashtag.aggregate([
            {
              $match: {
                hashtag: { $regex: new RegExp(search, "g") }
              }
            }
          ]);
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
