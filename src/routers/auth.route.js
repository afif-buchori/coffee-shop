const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.patch("/forgot", authController.forgotPass);
authRouter.post("/", authController.login);

authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);
authRouter.get("/role", authMiddleware.checkToken, authMiddleware.checkRole);
authRouter.patch("/", authMiddleware.checkToken, authController.editPassword);

module.exports = authRouter;