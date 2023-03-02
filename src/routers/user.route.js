const {Router} = require("express");
const userRouter = Router();

const db = require("../configs/postgre");
const tes = "select u.id, email, ur.role_name from users u join user_role ur on u.role_id=ur.id order by id asc limit 10";

userRouter.get("/", (req, res) => {
    db.query(tes, (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({
                msg: "Internal Server Error",
            });
            return;
        }
        console.log("Connection Database OK");
        res.status(200).json({
            data: result.rows,
        });
    });
});

module.exports = userRouter;