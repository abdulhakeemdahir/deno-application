const { Cause } = require("../models");
const { User } = require("../models");

module.exports = {
  getAllCause: async (req, res) => {
    try {
      const Post = await Cause.find({})
        .find({})
        .populate([
          {
            path: "author",
            select: "firstName",
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
        ])
        .exec();
      res.status(200).json(Post);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getUsersCauses: async (req, res) => {
    try {
      const causeModel = await Cause.find(req.body.username).sort({ date: -1 });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getTrending: async (req, res) => {
    try {
      const causeModel = await Cause.find(req.body.data)
        .populate({
          path: "likes",
          populate: {
            path: "user",
            model: "User"
          }
        })
        .sort({ date: -1 });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async ({ body }, res) => {
    const { title, content, imageUrl, author } = body;

    try {
      const causeModel = await Cause.create({
        title,
        content,
        imageUrl,
        author
      });
      res.status(201).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const causeModel = await Cause.findByIdAndUpdate(
        { username: req.params.username },
        req.body
      );
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const causeModel = await Cause.findByIdAndRemove({ _id: req.params.id });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  addLike: async (req, res) => {
    try {
      const user = await User.find(req.params.username);
      const causeModel = await Cause.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: user._id }
        },

        { new: true, runValidators: true }
      );
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
