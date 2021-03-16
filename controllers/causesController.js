const { Cause } = require("../models");

module.exports = {
  getUsersCauses: async (req, res) => {
    try {
      const causeModel = await Cause.find(req.query).sort({ date: -1 });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getTrending: async (req, res) => {
    try {
      const causeModel = await Cause.find(req.query)
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
  create: async (req, res) => {
    try {
      const causeModel = await Cause.create(req.body);
      res.status(201).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const causeModel = await Cause.findOneAndUpdate(
        { _id: req.params.id },
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
  }
};
