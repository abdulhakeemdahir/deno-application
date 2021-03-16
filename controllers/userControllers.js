const { User } = require("../models");
const { createPassword, comparePassword } = require("../config/bcrypt.js");
const JWT = require("../config/jwt");
const jwt = new JWT();

// Defining methods for the bookController
module.exports = {
  signUp: async ({ body }, res) => {
    const { firstName, lastname, username, password, role, email } = body;

    try {
      const createUser = await User.create({
        firstName: firstName,
        lastname: lastname,
        username: username,
        password: await createPassword(password),
        role: role,
        email: email
      });
      console.log(createUser);
      res
        .status(200)
        .json(
          "We created your account kindly activate your account " +
            createUser.firstName
        );
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username: username });
    // If user is not found then send back error message

    if (!user) {
      return res.json("Email or password is invalid.");
    }

    //check password
    const isMatch = await comparePassword(password, user.password);
    // If password doesn't match then error message

    if (!isMatch) {
      return res.json("Email or password is invalid.");
    }
    //if all password matches then issue a token for the user
    const createToken = jwt.issueToken(user._id, user.username);

    //return sign token
    return createToken;
  }
};
