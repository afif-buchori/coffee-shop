const { Router } = require("express");

const { checkToken, checkRole } = require("../middlewares/auth");
const transactionsController = require("../controllers/transactions.controller");
const notificationController = require("../controllers/notification.controller");

const transactionsRouter = Router();

transactionsRouter.post(
  "/",
  checkToken,
  transactionsController.createTransactions
);
transactionsRouter.get("/", checkToken, transactionsController.getHistory);
transactionsRouter.get(
  "/get-all-order",
  checkToken,
  checkRole,
  transactionsController.getAllOrders
);
transactionsRouter.get(
  "/get-done-order",
  checkToken,
  checkRole,
  transactionsController.getDoneOrders
);
transactionsRouter.patch(
  "/change-status-order/:id",
  checkToken,
  checkRole,
  transactionsController.changeStatusOrders
);
transactionsRouter.delete(
  "/:id",
  checkToken,
  transactionsController.deleteTransaction
);

transactionsRouter.post(
  "/notification",
  notificationController.notificationOrder
);

module.exports = transactionsRouter;
