const bcrypt = require("bcryptjs");
const util = require("util");

//promisfy so I can remove call back
const genSalt = util.promisify(bcrypt.genSalt);
const genHash = util.promisify(bcrypt.hash);
const compare = util.promisify(bcrypt.compare);

const SALT_WORK_FACTOR = 10;

//create hash password
const createPassword = async pass => {
  const salt = await genSalt(SALT_WORK_FACTOR);
  const hash = await genHash(pass, salt);

  return hash;
};

//compare password
const comparePassword = async (pass, hash) => {
  const match = await compare(pass, hash);
  return match;
};

module.exports.createPassword = createPassword;
module.exports.comparePassword = comparePassword;
