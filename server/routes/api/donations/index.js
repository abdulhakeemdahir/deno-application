const router = require("express").Router();
const { donationsController } = require("../../../controllers");

router.route("/pay").post(donationsController.pay);

router.route("/success").get(donationsController.success);

router.route("/cancel").get(donationsController.cancel);

module.exports = router;
