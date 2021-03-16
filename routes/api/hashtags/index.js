const router = require("express").Router();
const { hashtagsController } = require("../../../controllers");

router
  .route("/hashtags/:id")
  .get(hashtagsController.getHashtagAll)
  .get(hashtagsController.getHashtagPost)
  .get(hashtagsController.getHashtagCause)
  .get(hashtagsController.getHashtagComment);

router.route("/posts").post(hashtagsController.create);

router.route("/causes").post(hashtagsController.create);

router.route("/comments").post(hashtagsController.create);

router
  .route("/posts/:id")
  .update(hashtagsController.update)
  .remove(hashtagsController.remove);

router
  .route("/causes/:id")
  .update(hashtagsController.update)
  .remove(hashtagsController.remove);

router
  .route("/comments/:id")
  .update(hashtagsController.update)
  .remove(hashtagsController.remove);

router.route("/user/:id").get(hashtagsController.findUserPosts);

module.exports = router;
