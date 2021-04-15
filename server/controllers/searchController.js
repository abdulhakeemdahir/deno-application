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

        case "Post":
          response = await Post.aggregate([
            {
              $match: {
                content: { $regex: search }
              }
            }
          ]);
          res.status(200).json(response);
          break;

        case "Cause":
          response = await Cause.aggregate([
            {
              $match: {
                content: { $regex: search }
              }
            }
          ]);
          res.status(200).json(response);
          break;

        case "Hashtag":
          response = await Hashtag.aggregate([
            {
              $match: {
                hashtag: { $regex: search }
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
