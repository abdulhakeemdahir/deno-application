const { User } = require("../../models");

const router = require("express").Router();
const JWT = require("../../config/jwt");
const jwt = new JWT();
const bcrypt = require("../../config/bcrypt");

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username: username });
  // If user is not found then send back error message

  if (!user) {
    return res.json("Email or password is invalid.");
  }

  //check password
  const isMatch = await bcrypt.comparePassword(password, user.password);
  // If password doesn't match then error message

  if (!isMatch) {
    return res.json("Email or password is invalid.");
  }
  //if all password matches then issue a token for the user
  const createToken = jwt.issueToken(user._id, user.username);

  //return sign token
  return createToken;
});

router.post("/api/signup/personal", async ({ body }, res) => {
  const { firstName, lastname, username, password, role, email } = body;
  console.log("\x1b[31m", body);
  try {
    const createUser = await User.create({
      firstName: firstName,
      lastname: lastname,
      username: username,
      password: await bcrypt.createPassword(password),
      role: role,
      email: email
    });
    res.json(createUser);
  } catch (err) {
    res.json(err);
  }

  ///console.log(email, firstName, lastname, username, password, tokens, role);
});

module.exports = router;
