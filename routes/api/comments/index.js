const router = require("express").Router();
const { commentsController } = require("../../../controllers");

//The Causes that the use will get when they view their cause tab.
router
  .route("/")
  .get(commentsController.getComments)
  .post(commentsController.create); //pass in comment with either post or cause id

router
  .route("/:id")
  .put(commentsController.update)
  .delete(commentsController.remove);

module.exports = router;
