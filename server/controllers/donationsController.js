/* eslint-disable camelcase */
//const { User } = require("../models/");
const paypal = require("../config/paypal");
const axios = require("axios");
const siteUrl = require("../config/options")("siteUrl");
const clientId = require("../config/options")("clientId");
const client = require("../config/options")("client");

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
  },
  createToken: async (req, res) => {
    console.log(client);
    console.log(clientId);
    try {
      const {
        data: { access_token, token_type }
      } = await axios({
        url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        method: "post",
        headers: {
          Accept: "application/json",
          "content-type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: clientId,
          password: client
        },
        params: {
          grant_type: "client_credentials"
        }
      });

      return res.status(200).send({
        status: "success",
        message: "Creating Token",
        accessToken: access_token,
        tokenType: token_type
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        status: "failed",
        message: "Check Paypal Docs"
      });
    }
  }
  // createPayment: async (req, res)=>{

  // }
};
