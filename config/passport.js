const { User } = require("../models");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const access = require("./options")("access");

//options for jwt authentication method
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: access
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ username: payload.username });
    //check if found user
    if (user) {
      return done(null, user);
    }
    //no user then return false
    return done(null, false);
  } catch (error) {
    //if error return error and false user
    return done(error, false);
  }
});

// set password to use strategy
passport.use(strategy);
// Exporting our configured passport
module.exports = passport;
