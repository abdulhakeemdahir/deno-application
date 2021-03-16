const router = require("express").Router();
const { userControllers } = require("../../../controllers");

// api/user/:id
router
  .route("/:id")
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser)
  .get(userControllers.getUser);

// api/user/update/password/:id
router.route("/update/password/:id").put(userControllers.updatePassword);

module.exports = router;
