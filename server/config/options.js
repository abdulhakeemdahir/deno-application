require("dotenv").config();

const options = {
  access: process.env.ACCESS,
  secret: process.env.SECRET,
  mailPass: process.env.MAIL,
  user: process.env.USER,
  mongodb: process.env.MONGODB_URI || "mongodb://localhost/dono",
  siteUrl: process.env.SITEURL || "http://localhost:3000/"
};

module.exports = key => options[key];
