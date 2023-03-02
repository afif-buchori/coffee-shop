const db = require("../configs/postgre");
const pick = "p.id, p2.prod_name, coupon_code, discount, p2.price";
const tb = "promo p join products p2 on p.product_id = p2.id";
const showData = `select ${pick} from ${tb}`;

const getPromos = (req, res) => {
    db.query(showData, (err, result) => {
        if(err) {
            res.status(500).json({
                msg: "Internal Server Error",
            })
            return;
        }
        res.status(200).json({
            data: result.rows,
        });
    });
};

module.exports = {
    getPromos,
};