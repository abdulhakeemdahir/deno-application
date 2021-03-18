const router = require("express").Router();
const { hashtagsController } = require("../../../controllers");

router
  .route("/")
  .get(hashtagsController.getHashtagAll)
  .post(hashtagsController.create);

router.route("/posts").get(hashtagsController.getHashtagPost);

router.route("/causes").get(hashtagsController.getHashtagCause);

router.route("/comments").get(hashtagsController.getHashtagComment);
router
  .route("/:id")
  .put(hashtagsController.update)
  .delete(hashtagsController.remove);

module.exports = router;
