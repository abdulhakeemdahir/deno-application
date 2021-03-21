require("dotenv").config();

const options = {
  access: process.env.ACCESS,
  secret: process.env.SECRET,
  mailPass: process.env.MAIL,
  siteUrl: process.env.SITEURL,
  user: process.env.USER
};

module.exports = key => options[key];
