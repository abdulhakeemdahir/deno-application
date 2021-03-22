const router = require("express").Router();
const { causesController } = require("../../../controllers");

// The Causes that the user will get when they view their Causes tab.
router
  .route("/")
  .get(causesController.getAllCause)
  .get(causesController.getTrending)
  .post(causesController.create);

// The route for updating or deleting a cause.
router
  .route("/:id")
  .put(causesController.update)
  .get(causesController.getUsersCauses)
  .delete(causesController.remove);

router.route("/like/:id").put(causesController.addLike);

module.exports = router;
