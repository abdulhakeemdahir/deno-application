const router = require("express").Router();
const { authorizeControllers } = require("../../../controllers");

// Get middleware
const authenticateUser = require("../../../config/middleware/authenticateUser");

router.route("/login").post(authorizeControllers.login);

router.route("/signup/personal").post(authorizeControllers.signUp);

router
  .route("/authenticated")
  .post(authenticateUser, authorizeControllers.protected);

module.exports = router;
