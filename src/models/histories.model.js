const db = require("../configs/postgre");

const getHistories = (info) => {
    return new Promise((resolve, reject) => {
        let showData = "SELECT h.id, ub.user_id, display_name, h.product_id, prod_name, price, qty FROM history h JOIN users u ON h.user_id = u.id JOIN user_bio ub ON u.id = ub.user_id JOIN products p ON h.product_id = p.id ";
        let order = "ORDER BY h.id ASC ";
        if(info.user) {
            order = `WHERE ub.user_id = ${info.user} ORDER BY h.id ASC`;
        }
        showData += order;
        console.log(showData);
        db.query(showData, (error, result) => {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
};

const addHistory = (data) => {
    return new Promise((resolve, reject) => {
        const addData = "INSERT INTO history (user_id, product_id, qty) VALUES ($1, $2, $3) RETURNING *";
        const values = [data.user_id, data.product_id, data.qty];
        db.query(addData, values, (error, result) => {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
};

const editHistory = (info, data) => {
    return new Promise((resolve, reject) => {
        const editData = "UPDATE history SET user_id = $1, product_id = $2, qty = $3 WHERE id = $4 RETURNING *";
        const values = [data.user_id, data.product_id, data.qty, info.historyId];
        db.query(editData, values, (error, result) => {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
};

const deleteHistory = (info) => {
    return new Promise((resolve, reject) => {
        const values = [info.historyId];
        db.query("DELETE FROM history WHERE id = $1", values, (error, result) => {
            if(error) {
                reject(error);
            }
            resolve(result);
        });
    });
};

module.exports = {
    getHistories,
    addHistory,
    editHistory,
    deleteHistory,
};