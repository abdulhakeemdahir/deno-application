class JWT {
  constructor() {
    this.jwt = require("jsonwebtoken");
    this.access = require("../config/options.js")("access");
    this.expires = "2d";
  }

  async sign(payload) {
    //creates a token by sending user id and date creted as payload, access is the secret key, and time is
    const token = await this.jwt.sign(payload, this.access, {
      expiresIn: this.expires,
      algorithm: "RS256"
    });
    return token;
  }

  //this verifies if token is still valid
  async verify(token) {
    const decoded = await this.jwt.verify(token, this.access);
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
