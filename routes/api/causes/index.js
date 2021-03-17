const router = require("express").Router();
const { causesController } = require("../../../controllers");

// The Causes that the user will get when they view their Causes tab.
router
  .route("/dashboard")
  .get(causesController.getUsersCauses)
  .get(causesController.getTrending);

// The route for creating a cause.
router.route("/create/cause").post(causesController.create);

// The route for updating or deleting a cause.
router
  .route("/update/cause/:id")
  .put(causesController.update)
  .delete(causesController.remove);

module.exports = router;
