const { Router } = require("express");
const promosRouter = Router();
const promoController = require("../controllers/promos.controller");

promosRouter.get("/", promoController.getPromos);
promosRouter.get("/:promoId", promoController.getPromoDetails);
promosRouter.post("/", promoController.addPromo);
promosRouter.patch("/:promoId", promoController.editPromo);
promosRouter.delete("/delete/:promoId", promoController.deletePromo);

module.exports = promosRouter;