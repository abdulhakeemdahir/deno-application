const router = require("express").Router();
const { donationsController } = require("../../../controllers");

router.route("/pay").post(donationsController.pay);

router.route("/success").get(donationsController.success);

router.route("/cancel").get(donationsController.cancel);

router.route("/create-token").post(donationsController.createToken);

router.route("/create-referral").post(donationsController.createReferral);

module.exports = router;
