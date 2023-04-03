const { Router } = require("express");

const { checkToken } = require("../middlewares/auth");
const transactionsController = require("../controllers/transactions.controller");

const transactionsRouter = Router();

transactionsRouter.post(
  "/",
  checkToken,
  transactionsController.createTransactions
);
transactionsRouter.get("/", checkToken, transactionsController.getHistory);
module.exports = transactionsRouter;
