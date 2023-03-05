const db = require("../configs/postgre");

const getHistories = (info) => {
    return new Promise((resolve, reject) => {
        const showData = "SELECT * FROM history";
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