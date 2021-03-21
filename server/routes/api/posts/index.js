const router = require("express").Router();
const { postController } = require("../../../controllers");

router
  .route("/dashboard")
  .get(postController.getAllPost)
  .post(postController.create);

router.route("/following").get(postController.findFollowing);

router.route("/trending").get(postController.findTrending);

router
  .route("/dashboard/:_id")
  .put(postController.update)
  .delete(postController.remove);

router.route("/user").get(postController.findUserPosts);

module.exports = router;