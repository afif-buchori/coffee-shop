const { Router } = require("express");
const promosRouter = Router();
const promoController = require("../controllers/promos.controller");

const authMiddleware = require("../middlewares/auth");

promosRouter.get("/", promoController.getPromos);
promosRouter.get("/:promoId", promoController.getPromoDetails);
promosRouter.post(
  "/",
  authMiddleware.checkToken,
  authMiddleware.checkRole,
  promoController.addPromo
);
promosRouter.patch(
  "/:promoId",
  authMiddleware.checkToken,
  authMiddleware.checkRole,
  promoController.editPromo
);
promosRouter.delete(
  "/delete/:promoId",
  authMiddleware.checkToken,
  authMiddleware.checkRole,
  promoController.deletePromo
);

module.exports = promosRouter;
