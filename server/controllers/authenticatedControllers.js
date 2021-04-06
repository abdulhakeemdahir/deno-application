const { User } = require("../models");
const { createPassword, comparePassword } = require("../config/bcrypt.js");
// const crypto = require("../config/crypto.js");
// const Mail = require("../config/mail.js");
const JWT = require("../config/jwt");
const jwt = new JWT();

// Defining methods for the authorizeControllers
module.exports = {
  signUp: async ({ body }, res) => {
    const {
      firstName,
      lastname,
      username,
      password,
      role,
      email,
      orgName,
      phoneNumber,
      website,
      address
    } = body;

    const userObject = {
      firstName: firstName,
      lastname: lastname,
      username: username,
      password: await createPassword(password),
      role: role,
      email: email
    };

    if (orgName) {
      userObject.orgName = orgName;
    }
    if (phoneNumber) {
      updateUser.phoneNumber = phoneNumber;
    }
    if (website) {
      updateUser.website = website;
    }
    if (address) {
      updateUser.address = address;
    }
    try {
      const isUser = await User.findOne({
        $or: [{ username: username }, { email: email }]
      });

      if (isUser) {
        return res.status(422).json({
          header: "Sorry",
          message: "Username or email is unavalible",
          footer: "PLease try again"
        });
      }
      await User.create(userObject);

      // const key = crypto();

      // const mail = new Mail();

      // if (await mail.sendMail(email, key, "activate")) {
      return res.status(200).json({
        header: "Congratulations",
        message:
          "We created your account an Email has been send, kindly activate your account",
        footer: "Please Verify Account"
      });
      // }
    } catch (err) {
      res.status(422).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }]
      }).select("username email firstName lastname password");
      // If user is not found then send back error message
      if (!user) {
        return res.json({ default: "Username, Email or password is invalid." });
      }

      //check password
      const isMatch = await comparePassword(password, user.password);
      // If password doesn't match then error message
      if (!isMatch) {
        return res.json({ default: "Username, Email or password is invalid." });
      }
      //if all password matches then issue a token for the user
      const createToken = await jwt.issueToken(user);

      //return sign token
      return res.status(200).json(createToken);
    } catch (err) {
      return res
        .status(400)
        .json({ default: "Username, Email or password is invalid." });
    }
  },
  authenticated: async (req, res) => {
    res.json(req.user);
  }
};
