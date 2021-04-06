const { Comment } = require("../models/");

module.exports = {
  getComments: async (req, res) => {
    try {
      const getAllComment = await Comment.find({}).populate({
        path: "user",
        path: "likes",
        populate: {
          path: "user",
          model: "User"
        }
      });
      res.status(200).json(getAllComment);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const createComment = await Comment.create(req.body);

      res.status(201).json(createComment);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    try {
      await Comment.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(201).json("Updated Comment");
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params._id);
      res.status(201).json("Deleted Comment");
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
