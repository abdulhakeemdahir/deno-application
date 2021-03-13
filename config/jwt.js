const jwt = require("jsonwebtoken");
const util = require("util");

class JWT {
  constructor() {
    this.jwtSign = util.promisify(jwt.sign);
    this.jwtVerify = util.promisify(jwt.verify);
    this.access = require("../config/options.js")("access");
    this.expires = "2d";
  }

  async sign(payload) {
    //creates a token by sending user id and date creted as payload, access key, and time created
    const token = await this.jwtSign(payload, this.access, {
      expiresIn: this.expires,
      algorithm: "RS256"
    });
    return token;
  }

  //this verifies if token is still valid
  async verify(token) {
    const decoded = await this.jwtVerify(token, this.access);
    return decoded;
  }

  //issue a token for each user by sending in _id then return bearer token and expire time
  issueToken(user) {
    const _id = user._id;

    const expiresIn = this.expires;

    const payload = {
      sub: _id,
      iat: Date.now()
    };

    const signedToken = this.sign(payload);

    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    };
  }
}
//when creating user remember to issue a Token and retrun token and expiariton time to front end team
module.exports = JWT;
