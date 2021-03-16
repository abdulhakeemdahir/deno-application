const router = require("express").Router();
const authorize = require("./authorize");
const posts = require("./posts");
const causes = require("./causes");
const comments = require("./comments");
const users = require("./users");

//user  routes
router.use("/authorize", authorize);
router.use("/users", users);
router.use("/posts", posts);
router.use("/causes", causes);
router.use("/comments", comments);

module.exports = router;
