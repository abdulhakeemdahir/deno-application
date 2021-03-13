const router = require("express").Router();
const { userController } = require("../../../controllers");

router.route("/login").post(userController.login);

router.route("/signup/personal").post(userController.signUp);

module.exports = router;
