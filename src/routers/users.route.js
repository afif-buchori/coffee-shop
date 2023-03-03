const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/users.controller");

usersRouter.get("/",usersController.getUsers);
usersRouter.get("/:userId", usersController.getUserDetails);

module.exports = usersRouter;