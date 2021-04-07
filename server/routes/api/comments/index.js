const router = require("express").Router();
const { commentsController } = require("../../../controllers");

//The Causes that the use will get when they view their cause tab.
router.route("/").get(commentsController.getComments);

router.route("/").post(commentsController.create); //pass in comment with either post or cause id

router
  //rewrite controller
  .route("/:id")
  .put(commentsController.update);

router.route("/remove/:id/:postId").delete(commentsController.remove);

module.exports = router;
