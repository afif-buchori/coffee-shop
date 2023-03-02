const db = require("../configs/postgre");

const pick = "p.id, prod_name, price, pc.category";
const tb = "products p join prod_categories pc on p.category_id = pc.id";
const showData = `select ${pick} from ${tb}`;

const getProducts = (req, res) => {
    db.query(showData, (err, result) => {
        if(err) {
            res.status(500).json({
                msg: "Interna Server Error",
            });
            return;
        }
        res.status(200).json({
            data: result.rows,
        });
    });
};

module.exports = {
    getProducts,
};