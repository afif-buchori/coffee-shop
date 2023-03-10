const { Router } = require("express");

const welcomeRouter = require("./welcome.route");
const authRouter = require("./auth.route");
const usersRouter = require("./users.route");
const productsRouter = require("./products.route");
const promosRouter = require("./promos.route");
const historiesRouter = require("./histories.route");
const transactionsRouter = require("./transactions.route");

const masterRouter = Router();

masterRouter.use("/", welcomeRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use("/promos", promosRouter);
masterRouter.use("/histories", historiesRouter);
masterRouter.use("/transactions", transactionsRouter);


module.exports = masterRouter;