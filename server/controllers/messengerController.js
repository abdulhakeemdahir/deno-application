const { Conversation, Message } = require("../models");

module.exports = {
  getConversation: async (req, res) => {
    try {
      const convoModel = await Conversation.find(req.query).sort({ date: -1 });
      res.status(200).json(convoModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getMessages: async (req, res) => {
    try {
      const messageModel = await Message.find(req.query).sort({ date: -1 });
      res.status(200).json(messageModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getLatestConversation: async (req, res) => {
    try {
      const convoModel = await Conversation.findOne(
        { participants: req.query },
        { sort: { updatedAt: -1 } }
      );
      res.status(200).json(convoModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  createConversation: async (req, res) => {
    try {
      const convoModel = await Conversation.create(req.body);
      res.status(201).json(convoModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  createMessage: async (req, res) => {
    try {
      const messageModel = await Message.create(req.body);
      res.status(201).json(messageModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  updateMessage: async (req, res) => {
    try {
      const messageModel = await Message.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json(messageModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
