const router = require("express").Router();
const { userController } = require("../../../controllers");

router.route("/").get(userController.getAllUsers);

// api/user:id
router
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser);

router.route("/:username").get(userController.getUsersByUsername);

//api/user/liked/:id
router.route("/liked/:id/:causeId").get(userController.findIfUserLikesCause);

router.route("/update/references/:id").put(userController.updateUserObjectID);

// api/user/update/password/:id
router.route("/update/password/:id").put(userController.updatePassword);

module.exports = router;
