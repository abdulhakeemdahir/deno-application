const router = require("express").Router();
const { userController } = require("../../../controllers");

<<<<<<< HEAD
router.route("/").get(userController.getAllUsers);

// api/user/:id
=======
// api/user:id
>>>>>>> 182eb841b768145d9ebfd16dc68b60a071c1e896
router
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser);

//api/user/liked/:id
router.route("/liked/:id/:causeId").get(userController.findIfUserLikesCause);

// api/user/update/password/:id
router.route("/update/password/:id").put(userController.updatePassword);

module.exports = router;
