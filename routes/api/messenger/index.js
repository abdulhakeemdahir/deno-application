const router = require("express").Router();
const { messengerController } = require("../../../controllers");

router
  .route("/messenger/:id")
  .get(messengerController.getConversation)
  .get(messengerController.getMessages)
  .post(messengerController.createConversation)
  .update(messengerController.createMessage);

router
  .route("messenger/:messageId/:id")
  .update(messengerController.updateMessage);

module.exports = router;
