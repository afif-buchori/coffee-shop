const { Router } = require("express");
const productsRouter = Router();

const productsController = require("../controllers/products.controller");

const authMiddleware = require("../middlewares/auth");

const { singleUpload } = require("../middlewares/diskUpload");

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:productId", productsController.getProductDetails);
productsRouter.post("/", authMiddleware.checkToken, authMiddleware.checkRole, singleUpload("image"), productsController.addProducts);
productsRouter.patch("/:productId", authMiddleware.checkToken, authMiddleware.checkRole, singleUpload("image"), productsController.editProducts);
productsRouter.delete("/:deleteId", authMiddleware.checkToken, authMiddleware.checkRole, productsController.deleteProduct);


module.exports = productsRouter;