const router = require("express").Router();
const { postController } = require("../../../controllers");

router
  .route("/")
  .get(postController.getAllPost)
  .post(postController.create);

router.route("/:id").put(postController.update);

router
  .route("/object/:id")
  .put(postController.updateObjectID)
  .delete(postController.remove);

router.route("/remove/like/:id").put(postController.removeliked);

module.exports = router;
