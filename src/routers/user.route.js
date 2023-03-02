const {Router} = require("express");
const userRouter = Router();
const userController = require("../controllers/user.controller");

userRouter.get("/",userController.getUsers);

module.exports = userRouter;