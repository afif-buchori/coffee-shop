const db = require("../configs/postgre");

const userVerification = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT id, email, password FROM users WHERE email = $1";
        db.query(sqlQuery, [email], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const createAccount = (data) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO users (email, password, phone) VALUES ($1, $2, $3) RETURNING *";
        const values = [data.email, data.hashedPassword, data.phone];
        db.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const createSubAccount = (userId, data) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO user_bio (user_id, display_name) VALUES ($1, $2)";
        db.query(sqlQuery, [userId, data], (error, result) => {
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

const getAccount = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT id, email FROM users WHERE email = $1";
        db.query(sqlQuery, [email], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const forgotPass = (userId, optCode) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "UPDATE users SET code_otp = $1 WHERE id = $2 RETURNING id, email, phone, code_otp";
        db.query(sqlQuery, [optCode, userId], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

module.exports = {
    userVerification,
    createAccount,
    createSubAccount,
    getAccount,
    getPassword,
    editPassword,
    forgotPass,
};