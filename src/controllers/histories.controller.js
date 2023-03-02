db = require("../configs/postgre");
const showData = "select * from history";

const getHistories = (req, res) => {
    db.query(showData, (err, result) => {
        if(err) {
            res.status(500).json({
                msg: "Internal Server Error",
            });
            return;
        }
        res.status(200).json({
            data: result.rows,
        });
    });
};

module.exports = {
    getHistories,
};