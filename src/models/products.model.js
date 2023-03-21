// const { query } = require("express");
const db = require("../configs/postgre");

const getProducts = (info) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT id, category_id, prod_name, price, image FROM products WHERE id <> 1";
        let parameters = " ";
        if(info.search) {
            parameters += `AND LOWER(prod_name) LIKE LOWER('%${info.search}%') `;
        }
        if(info.category) {
            if(!info.search) {
                parameters += `AND category_id = ${info.category} `;
            }
            parameters += `AND category_id = ${info.category} `;
        }
        if(info.order === "cheapest") {
            parameters += "ORDER BY price ASC ";
        }
        if(info.order === "priciest") {
            parameters += "ORDER BY price DESC ";
        }
        if(!info.order) {
            parameters += "ORDER BY id ASC";
        }
        const limit = parseInt(info.limit) || 12;
        const page = parseInt(info.page) || 1;
        const offset = (page - 1) * limit;
        sqlQuery += `${parameters} LIMIT ${limit} OFFSET ${offset}`;
        console.log(sqlQuery);
        db.query(sqlQuery, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const getMetaProducts = (info) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT COUNT(*) AS total_data FROM products";
        db.query(sqlQuery, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            const totalData = parseInt(result.rows[0].total_data);
            const limit = parseInt(info.limit) || 12;
            const page = parseInt(info.page) || 1;
            const totalPage = Math.ceil(totalData / limit);
            let next = "";
            let prev = "";
            if(page < totalPage) {
                next = `/products?page=${page + 1}&limit=${limit}`;
            } else {
                next = null;
            }

            if(page > 1) {
                prev = `/products?page=${page - 1}&limit=${limit}`;
            } else {
                prev = null;
            }
            const meta = {
                totalData,
                next,
                prev,
                totalPage,
            };
            resolve(meta);
        });
    });
};

const getProductDetails =  (info) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT p.id, prod_name, price, pc.category, prod_picture FROM products p join prod_categories pc ON p.category_id = pc.id WHERE p.id = $1";
        const values = [info.productId];
        db.query(sqlQuery, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const addProducts = (req) => {
    return new Promise((resolve, reject) => {
        const { body } = req;
        const sqlQuery = "INSERT INTO products (prod_name, price, category_id, image) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [body.prod_name, body.price, body.category_id];
        if(req.file) {
            const fileLink = `/images/products/${req.file.filename}`;
            values.push(fileLink);
        }
        db.query(sqlQuery, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};
const insertProduct = (req, fileLink) => {
    return new Promise((resolve, reject) => {
        const { body } = req;
        const sqlQuery = "INSERT INTO products (prod_name, price, category_id, image) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [body.prod_name, body.price, body.category_id, fileLink];
        db.query(sqlQuery, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const editProducts = (req) => {
    return new Promise((resolve, reject) => {
        const { params, body } = req;
        let sqlQuery = "UPDATE products SET ";
        let values = [];
        let i = 1;
        for(const [key, val] of Object.entries(body)) {
            sqlQuery += `${key} = $${i}, `;
            values.push(val);
            i++;
        }
        if(req.file) {
            const fileLink = `/images/products/${req.file.filename}`;
            sqlQuery += `image = '${fileLink}', `;
        }
        sqlQuery += `update_at = NOW() WHERE id = $${i} RETURNING *`;
        values.push(params.productId);
        console.log(sqlQuery);
        db.query(sqlQuery, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
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
    getMetaProducts,
    getProductDetails,
    addProducts,
    insertProduct,
    editProducts,
    deleteProduct,
};