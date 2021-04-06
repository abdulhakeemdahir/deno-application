const router = require("express").Router();
const { userController } = require("../../../controllers");

router.route("/").get(userController.getAllUsers);

// api/user:id
router
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser);

//api/user/liked/:id
router.route("/liked/:id/:causeId").get(userController.findIfUserLikesCause);

router.route("/update/references/:id").put(userController.updateUserObjectID);

router.route("/remove/references/:id").put(userController.removeUserObjectID);

// api/user/update/password/:id
router.route("/update/password/:id").put(userController.updatePassword);

module.exports = router;
