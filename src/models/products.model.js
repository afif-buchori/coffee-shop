const db = require("../configs/postgre");

const getProducts = (info) => {
    return new Promise((resolve, reject) => {
        let showData = "SELECT id, prod_name, price, prod_picture FROM products ";
        let order = "ORDER BY id ASC Limit 5";
        if(info.page) {
            if(info.page === "all") {
                order = "ORDER BY id ASC";
            } else {
                let offset = parseInt(info.page);
                let page = (offset - 1) * 5;
                order = `ORDER BY id ASC LIMIT 5 OFFSET ${page}`;
            }
        }
        if(info.order === "cheapest") {
            order = "ORDER BY price ASC";
        }
        if(info.order === "priciest") {
            order = "ORDER BY price DESC";
        }
        if(info.search) {
            order = `WHERE LOWER(prod_name) LIKE LOWER('%${info.search}%') ORDER BY id ASC`;
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
};

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

const editProducts = (info, data) => {
    return new Promise((resolve, reject) => {

        const editData = "UPDATE products SET prod_name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *";
        values = [data.prod_name, data.price, data.category_id, info.productId];
        db.query(editData, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    })
};

const deleteProduct = (info) => {
    return new Promise((resolve, reject) => {
        const values = [info.deleteId];
        db.query("DELETE FROM products WHERE id = $1", values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = {
    getProducts,
    getProductDetails,
    addProducts,
    editProducts,
    deleteProduct,
};