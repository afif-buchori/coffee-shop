const { Router } = require("express");
const promosRouter = Router();
const promoController = require("../controllers/promos.controller");

promosRouter.get("/", promoController.getPromos);

module.exports = promosRouter;