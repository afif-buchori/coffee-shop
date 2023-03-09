const db = require("../configs/postgre");

const userVerification = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT id, email, password FROM users WHERE email = $1";
        db.query(sqlQuery, [email], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    });
};

const getAccount = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT id, email FROM users WHERE email = $1";
        db.query(sqlQuery, [email], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const getPassword = (userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT password FROM users WHERE id = $1";
        db.query(sqlQuery, [userId], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const editPassword = (newPassword, userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "UPDATE users SET password = $1 WHERE id = $2";
        const values = [newPassword, userId];
        console.log(values);
        db.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

module.exports = {
    userVerification,
    getAccount,
    getPassword,
    editPassword,
};