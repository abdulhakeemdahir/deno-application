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
    try {
      const token = await this.jwtSign(payload, this.access, {
        expiresIn: this.expires
      });
      return token;
    } catch (err) {
      console.log(err);
    }
  }

  //this verifies if token is still valid
  async verify(token) {
    const decoded = await this.jwtVerify(token, this.access);
    return decoded;
  }

  //issue a token for each user by sending in _id then return bearer token and expire time
  async issueToken({ email, username, _id }) {
    const expiresIn = this.expires;

    const payload = {
      email: email,
      username: username
    };

    const signedToken = await this.sign(payload);

    return {
      success: true,
      token: "Bearer " + signedToken,
      user: {
        email: email,
        username: username,
        _id: _id
      },
      expires: expiresIn
    };
  }
}
//when creating user remember to issue a Token and retrun token and expiariton time to front end team
module.exports = JWT;
