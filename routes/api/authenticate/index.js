const router = require("express").Router();
const { authenticatedControllers } = require("../../../controllers");

// Get middleware
const authenticateUser = require("../../../config/middleware/authenticateUser");

router.route("/login").post(authenticatedControllers.login);

router.route("/register/personal").post(authenticatedControllers.signUp);

router
  .route("/authenticated")
  .post(authenticateUser, authenticatedControllers.authenticated);

module.exports = router;
