const { Hashtag } = require("../models");

module.exports = {
  getHashtagAll: async (req, res) => {
    try {
      const hashtagModel = await Hashtag.find(req.query).sort({ date: -1 });
      res.status(200).json(hashtagModel);
    } catch (err) {
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
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const hashtagModel = await Hashtag.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json(hashtagModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const hashtagModel = await Hashtag.findById({ _id: req.params.id });
      const deleteModel = await hashtagModel.remove();
      res.status(200).json(deleteModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
