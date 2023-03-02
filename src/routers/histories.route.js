const { Router } = require("express");
const historiesRouter = Router();
const historiesController = require("../controllers/histories.controller");

historiesRouter.get("/", historiesController.getHistories);

module.exports = historiesRouter;