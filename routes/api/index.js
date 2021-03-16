const router = require("express").Router();
const user = require("./user");
const posts = require("./posts");
const causes = require("./causes");
const hashtags = require("./hashtags");

//user  routes
router.use("/user", user);
router.use("/posts", posts);
router.use("/causes", causes);
router.use("/hashtags", hashtags);

module.exports = router;
