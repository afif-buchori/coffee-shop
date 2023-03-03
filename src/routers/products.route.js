const { Router } = require("express");
const productsRouter = Router();
const productsController = require("../controllers/products.controller");

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:productId", productsController.getProductDetails);
productsRouter.post("/", productsController.addProducts);
productsRouter.put("/", productsController.editProducts);
productsRouter.delete("/delete/:deleteId", productsController.deleteProduct);

productsRouter.get("/image/:productId", productsController.showProdImage);

module.exports = productsRouter;