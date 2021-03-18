const router = require("express").Router();
const { postController } = require("../../../controllers");

router
  .route("/dashboard")
  .get(postController.findFollowing)
  .get(postController.findTrending)
  .post(postController.create);

router
  .route("/dashboard/:_id")
  .put(postController.update)
  .delete(postController.remove);

router.route("/user/:id").get(postController.findUserPosts);

module.exports = router;
