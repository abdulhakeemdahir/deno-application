const router = require("express").Router();
const user = require("./user");

//user  routes
router.use("/users", user);

module.exports = router;
