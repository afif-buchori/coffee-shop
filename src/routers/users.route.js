const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/users.controller");

usersRouter.get("/",usersController.getUsers);
usersRouter.get("/:userId", usersController.getUserDetails);
usersRouter.post("/", usersController.addUsers);
usersRouter.put("/", usersController.editUser);

module.exports = usersRouter;