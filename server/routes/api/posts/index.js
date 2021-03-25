const router = require("express").Router();
const { postController } = require("../../../controllers");

router
  .route("/")
  .get(postController.getAllPost)
  .post(postController.create);

router.route("/likes/:id:user").put(postController.addLike);

router.route("/findliked/:id/:user").get(postController.findLiked);

router
  .route("/:id")
  .put(postController.update)
  .delete(postController.remove);

router.route("/user").get(postController.findUserPosts);

module.exports = router;
