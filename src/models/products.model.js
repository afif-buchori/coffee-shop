// const { query } = require("express");
const db = require("../configs/postgre");

const getProducts = (info) => {
    return new Promise((resolve, reject) => {
        let showData = "SELECT id, category_id, prod_name, price FROM products";
        let parameters = " ";
        if(info.search) {
            parameters += `WHERE LOWER(prod_name) LIKE LOWER('%${info.search}%') `;
        }
        if(info.category) {
            if(!info.search) {
                parameters += `WHERE category_id = ${info.category} `;
            }
            parameters += `AND category_id = ${info.category} `
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
        const limit = parseInt(info.limit) || 5;
        const page = parseInt(info.page) || 1;
        const offset = (page - 1) * limit;
        showData += `${parameters} LIMIT ${limit} OFFSET ${offset}`;
        console.log(showData);
        db.query(showData, (error, result) => {
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
            const limit = parseInt(info.limit) || 5;
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
            }
            resolve(meta);
        });
    });
};

const getProductDetails =  (info) => {
    return new Promise((resolve, reject) => {
        const showData = "SELECT p.id, prod_name, price, pc.category, prod_picture FROM products p join prod_categories pc ON p.category_id = pc.id WHERE p.id = $1";
        const values = [info.productId];
        db.query(showData, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
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

        // const editData = "UPDATE products SET prod_name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *";
        // const values = [data.prod_name, data.price, data.category_id, info.productId];

        let editData = "UPDATE products SET ";
        let values = [];
        let i = 1;
        for(const [key, val] of Object.entries(data)) {
            editData += `${key} = $${i}, `;
            values.push(val);
            i++;
        }
        editData = editData.slice(0, -2);
        editData += `WHERE id = $${i} RETURNING *`;
        values.push(info.productId);
        console.log(editData);
        db.query(editData, values, (error, result) => {
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
    editProducts,
    deleteProduct,
};