const router = require("express").Router();
const { userController } = require("../../../controllers");

// api/user/:id
router
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser);

// api/user/update/password/:id
router.route("/update/password/:id").put(userController.updatePassword);

module.exports = router;
