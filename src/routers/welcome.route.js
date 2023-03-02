const {Router} = require("express");
const welcomeRouter = Router();

welcomeRouter.get("/", (req, res) => {
    res.json({
        msg: "Welcome Coffee Shop",
    });
});

module.exports = welcomeRouter;