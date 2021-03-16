const { Post } = require("../models");

module.exports = {
  findFollowing: async (req, res) => {
    try {
      const postModel = await Post.find(req.query).sort({ date: -1 });
      res.json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findTrending: async (req, res) => {
    try {
      const postModel = await Post.findById(req.query).sort({ date: -1 });
      res.json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findUserPosts: async (req, res) => {
    try {
      const postModel = await Post.findById(req.query).sort({ date: -1 });
      res.json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const postModel = await Post.create(req.body);
      res.status(201).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const postModel = await Post.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const postModel = await Post.findOneAndDelete({ _id: req.params.id });
      const deleteModel = await postModel.remove();
      res.status(200).json(deleteModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
