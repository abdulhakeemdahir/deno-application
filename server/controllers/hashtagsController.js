const { Hashtag } = require("../models");

module.exports = {
  getHashtagAll: async (req, res) => {
    try {
      const hashtagModel = await Hashtag.find({})
        .sort({ date: -1 })
        .populate([
          {
            path: "posts",
            model: "Post"
          },
          {
            path: "causes",
            model: "Cause"
          }
        ])
        .exec();
      res.status(200).json(hashtagModel);
    } catch (err) {
      console.log("hit inside controllers hashtag", err);
      res.status(422).json(err);
    }
  },
  getHashtagPost: async (req, res) => {
    try {
      const hashtagModel = await Hashtag.find(req.query).sort({ date: -1 });
      res.status(200).json(hashtagModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getHashtagCause: async (req, res) => {
    try {
      const hashtagModel = await Hashtag.find(req.query).sort({ date: -1 });
      res.status(200).json(hashtagModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getHashtagComment: async (req, res) => {
    try {
      const hashtagModel = await Hashtag.find(req.query).sort({ date: -1 });
      res.status(200).json(hashtagModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const hashtagModel = await Hashtag.create(req.body);
      res.status(201).json(hashtagModel);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  update: async ({ body, params }, res) => {
    try {
      const hashtagModel = await Hashtag.findByIdAndUpdate(
        params.id,
        {
          $push: body
        },

        { new: true, runValidators: true }
      );

      res.status(200).json(hashtagModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const hashtagModel = await Hashtag.findById({ _id: req.params._id });
      const deleteModel = await hashtagModel.remove();
      res.status(200).json(deleteModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
