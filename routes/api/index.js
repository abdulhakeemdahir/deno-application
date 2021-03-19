const router = require("express").Router();
const authenticate = require("./authenticate");
const posts = require("./posts");
const causes = require("./causes");
const comments = require("./comments");
const users = require("./users");
const hashtags = require("./hashtags");
const messenger = require("./messenger");
const donations = require("./donations");

//user  routes
router.use("/authenticate", authenticate);
router.use("/users", users);
router.use("/posts", posts);
router.use("/causes", causes);
router.use("/comments", comments);
router.use("/hashtags", hashtags);
router.use("/messenger", messenger);
router.use("/donations", donations);

module.exports = router;
