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
  },
  createReferral: async (req, res) => {
    console.log(req.body.token);
    try {
      const { data } = await axios({
        url: "https://api-m.sandbox.paypal.com/v2/customer/partner-referrals",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // eslint-disable-next-line prettier/prettier
          Authorization:
            `Bearer ${req.body.token}`
        },
        data: {
          tracking_id: "1234567lhfdghdfg89DONO",
          operations: [
            {
              operation: "API_INTEGRATION",
              api_integration_preference: {
                rest_api_integration: {
                  integration_method: "PAYPAL",
                  integration_type: "THIRD_PARTY",
                  third_party_details: {
                    features: ["PAYMENT", "REFUND"]
                  }
                }
              }
            }
          ],
          products: ["EXPRESS_CHECKOUT"],
          legal_consents: [
            {
              type: "SHARE_DATA_CONSENT",
              granted: true
            }
          ]
        }
      });
      console.log(data);
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        status: "failed",
        message: "Check Paypal Docs"
      });
    }
  }
};
