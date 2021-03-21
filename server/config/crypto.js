const crypto = require("crypto-random-string");

const key = crypto({ length: 15, type: "alphanumeric" }).toString();

module.exports = key;
