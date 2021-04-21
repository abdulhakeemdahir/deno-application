/* eslint-disable prettier/prettier */
const paypal = require("paypal-rest-sdk");
const siteUrl = require("./options")("siteUrl");
const clientId = require("./options")("clientId");
const client = require("./options")("client");
const util = require("util");


class PayPal {
  constructor() {
    this.paypal = paypal.configure({
      mode: "sandbox", //sandbox or live
      // eslint-disable-next-line camelcase
      client_id: clientId,
      // eslint-disable-next-line camelcase
      client_secret: client,
    });

    this.amount = 0;
  }

  createPayment(cause, amount) {
    this.amount = amount;
    const create = {
      intent: "sale",
      payer: {
        // eslint-disable-next-line camelcase
        payment_method: "paypal",
      },
      // eslint-disable-next-line camelcase
      redirect_urls: {
        // eslint-disable-next-line camelcase
        return_url: `${siteUrl}`,
        // eslint-disable-next-line camelcase
        cancel_url: `${siteUrl}api/donations/cancel`,
      },
      transactions: [
        {
          // eslint-disable-next-line camelcase
          item_list: {
            items: [
              {
                name: cause,
                sku: "001",
                price: this.amount,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: this.amount,
          },
          description: "Donation to " + cause,
        },
      ],
    };
    return JSON.stringify(create);
  }

  async payment({ cause, amount }) {
  
    const createPaymentJson = await this.createPayment(cause, amount);
    console.log(createPaymentJson);
    let link = "";
    await paypal.payment.create(createPaymentJson, (error, payment) => {
      if (error) {
        console.log(error);
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            console.log(payment.links[i].href);
            link = payment.links[i].href;
          }
        }
      }
    });
    return link;
  }

  async executePayment(payerId, paymentId) {
    try {
      const executePayment = {
        // eslint-disable-next-line camelcase
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: this.amount
            }
          }
        ]
      };

      const execute = util.promisify(paypal.payment.execute);
      const payment = await execute(paymentId, JSON.stringify(executePayment));

      console.log(JSON.stringify(payment));
      return "Success";
    } catch (err) {
      console.log(err.response);
      return "Failed";
    }
  }
}

module.exports = new PayPal();


 