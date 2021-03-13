require("dotenv").config();

const options = {
  access: process.env.ACCESS,
  secret: process.env.SECRET,
  mailPass: process.env.MAIL,
  siteUrl: process.env.SITEURL
};

module.exports = key => options[key];
