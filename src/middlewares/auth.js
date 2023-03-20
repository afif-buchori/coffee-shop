const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../configs/environment");

const checkToken = (req, res, next) => {
    try {
        const bearerToken = req.header("Authorization");
        if(!bearerToken) return res.status(403).json({
            msg: "Please Login...",
        });
        const token = bearerToken.split(" ")[1];
        jwt.verify(token, jwtSecret, (err, payload) => {
            if(err && err.name) return res.status(403).json({
                msg: err.message,
            });
            if(err) return res.status(500).json({
                msg: "Internal Server Error...",
            });
            req.authInfo = payload;
            // const result = await authModel.compareToken(req.authInfo.id, token);
            // if(result.rows < 1) return res.status(403).json({
            //     msg: "Token Expired...",
            // });
            next();
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server Error",
        });
    }
};

const checkRole = (req, res, next) => {
    const { role_id } = req.authInfo;
    if(role_id === 1) return res.status(403).json({
        msg: "You don't Have Access..",
        data: req.authInfo,
    });
    next();
};

module.exports = {
    checkToken,
    checkRole,
};