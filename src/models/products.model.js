const db = require("../configs/postgre");


const getProducts = (info) => {
    return new Promise((resolve, reject) => {
        let showData = "SELECT id, prod_name, price, prod_picture FROM products ORDER BY ";
        let order = "id ASC";
        if(info.order === "cheapest") {
            order = "price ASC";
        }
        if(info.order === "priciest") {
            order = "price DESC";
        }
        showData += order;
        db.query(showData, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const getProductDetails =  (info) => {
    return new Promise((resolve, reject) => {
        const showData = "SELECT p.id, prod_name, price, pc.category, prod_picture FROM products p join prod_categories pc ON p.category_id = pc.id WHERE p.id = $1";
        values = [info.productId];
        db.query(showData, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    })
}

const addProducts = (data) => {
    return new Promise((resolve, reject) => {

        const addData = "INSERT INTO products (prod_name, price, category_id) VALUES ($1, $2, $3) RETURNING *";
        const values = [data.prod_name, data.price, data.category_id];
        db.query(addData, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const editProducts = (data) => {
    return new Promise((resolve, reject) => {

        const editData = "UPDATE products SET prod_name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *";
        values = [data.prod_name, data.price, data.category_id, data.id];
        db.query(editData, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    })
}

module.exports = {
    getProducts,
    getProductDetails,
    addProducts,
    editProducts,
};