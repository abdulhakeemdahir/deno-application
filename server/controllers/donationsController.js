//const { User } = require("../models/");
const paypal = require("../config/paypal");
const siteUrl = require("../config/options")("siteUrl");

module.exports = {
  pay: async (req, res) => {
    try {
      const link = await paypal.payment(req.body);
      console.log(link);
      res.redirect(link);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  success: async (req, res) => {
    try {
      console.log("HERE");
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;

      await paypal.executePayment(payerId, paymentId);

      res.redirect(siteUrl);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  cancel: async (req, res) => {
    res.redirect("/");
  }
};
