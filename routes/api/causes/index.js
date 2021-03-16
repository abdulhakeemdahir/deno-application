const router = require("express").Router();
const { causeController } = require("../../../controllers");

// The Causes that the user will get when they view their Causes tab.
router
  .route("/dashboard")
  .get(causeController.getUsersCauses)
  .get(causeController.getTrending);

// The route for creating a cause.
router.route("/create/cause").post(causeController.create);

// The route for updating or deleting a cause.
router
  .route("/update/cause/:id")
  .update(causeController.update)
  .remove(causeController.remove);

module.exports = router;
