const { Router } = require("express");
const productsRouter = Router();
const productsController = require("../controllers/products.controller");

productsRouter.get("/",productsController.getProducts);

module.exports = productsRouter;