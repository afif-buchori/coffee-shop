const { Router } = require("express");
const historiesRouter = Router();
const historiesController = require("../controllers/histories.controller");

historiesRouter.get("/", historiesController.getHistories);
historiesRouter.post("/", historiesController.addHistory);
historiesRouter.patch("/:historyId", historiesController.editHistory);
historiesRouter.delete("/delete/:historyId", historiesController.deleteHistory);

module.exports = historiesRouter;