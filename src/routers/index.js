const {Router} = require("express");

const welcomeRouter = require("./welcome.route");
const userRouter = require("./user.route");

const masterRouter = Router();
masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", userRouter);

module.exports = masterRouter;