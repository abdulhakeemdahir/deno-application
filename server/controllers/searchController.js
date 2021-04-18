/* eslint-disable indent */
const { User, Post, Cause, Hashtag } = require("../models");

module.exports = {
  getSearchResults: async (req, res) => {
    try {
      const { action, search } = req.params;

      console.log(action);

      console.log(search);

      let response;

      const searchRegex = new RegExp(search);

      switch (action) {
        case "User":
          response = await User.find({
            $or: [
              { username: { $regex: searchRegex, $options: "i" } },
              { firstName: { $regex: searchRegex, $options: "i" } },
              { lastname: { $regex: searchRegex, $options: "i" } }
            ]
          });
          console.log(response);
          res.status(200).json(response);
          break;

        case "Posts":
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
          })
            .sort({ date: -1 })
            .populate([
              {
                path: "author",
                select: "username orgName",
                model: "User"
              },
              {
                path: "likes",
                model: "User",
                populate: {
                  path: "user",
                  model: "User"
                }
              }
            ]);
          console.log(response);
          res.status(200).json(response);
          break;

        case "Hashtags":
          response = await Hashtag.find({
            hashtag: { $regex: searchRegex, $options: "i" }
          }).populate([
            {
              path: "posts",
              model: "Post",
              options: { sort: { date: -1 } },
              populate: [
                {
                  path: "author",
                  select: "firstName username",
                  model: "User"
                },
                {
                  path: "likes",
                  select: "username",
                  model: "User"
                },
                {
                  path: "hashtags",
                  model: "Hashtag"
                },
                {
                  path: "comments",
                  model: "Comment",
                  options: { sort: { date: -1 } },
                  populate: [
                    {
                      path: "user",
                      select: "username",
                      model: "User"
                    }
                  ]
                }
              ]
            },
            {
              path: "causes",
              model: "Cause",
              options: { sort: { date: -1 } },
              populate: [
                {
                  path: "author",
                  select: "username orgName",
                  model: "User"
                },
                {
                  path: "likes",
                  select: "username",
                  model: "User"
                }
              ]
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
