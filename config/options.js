require("dotenv").config();

const options = {
  access: process.env.ACCESS,
  secret: process.env.SECRET
};

module.exports = key => options[key];
