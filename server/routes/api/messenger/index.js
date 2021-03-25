const router = require("express").Router();
const { messengerController } = require("../../../controllers");

router
  .route("/messenger/:id")
  .get(messengerController.getConversation)
  .get(messengerController.getMessages)
  .post(messengerController.createConversation)
  .put(messengerController.createMessage);

router
  .route("/conversation/:id")
  .get(messengerController.getLatestConversation);

router.route("messenger/:messageId/:id").put(messengerController.updateMessage);

module.exports = router;
