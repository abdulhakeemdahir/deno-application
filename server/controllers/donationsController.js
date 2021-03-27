//const { User } = require("../models/");
const paypal = require("../config/paypal");

module.exports = {
  pay: async (req, res) => {
    try {
      const link = paypal.payment(req.body);

      res.redirect(link);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  success: async (req, res) => {
    try {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;

      const payment = paypal.executePayment(payerId, paymentId);
      res.status(201).json(payment);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  cancel: async (req, res) => {
    res.redirect("/");
  }
};
