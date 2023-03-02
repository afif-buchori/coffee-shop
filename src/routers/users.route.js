const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/users.controller");

usersRouter.get("/",usersController.getUsers);

module.exports = usersRouter;