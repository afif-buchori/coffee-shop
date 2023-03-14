const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

const authRouter = Router();

const { singleUpload } = require("../middlewares/diskUpload");

authRouter.post("/register", authController.register);
authRouter.patch("/forgot", authController.forgotPass);
authRouter.patch("/editpassbyforgot", authController.editPassbyForgot);
authRouter.post("/", authController.login);

authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);
authRouter.get("/role", authMiddleware.checkToken, authMiddleware.checkRole);
authRouter.patch("/", authMiddleware.checkToken, authController.editPassword);

authRouter.patch("/profile", authMiddleware.checkToken, singleUpload("image"), authController.editProfile);

authRouter.patch("/logout", authMiddleware.checkToken, authController.logout);

module.exports = authRouter;