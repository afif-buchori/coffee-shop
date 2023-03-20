const db = require("../configs/postgre");

const userVerification = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT id, email, password, role_id FROM users WHERE email = $1";
        db.query(sqlQuery, [email], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const createAccount = (client, data) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO users (email, password, phone) VALUES ($1, $2, $3) RETURNING *";
        const values = [data.email, data.hashedPassword, data.phone];
        client.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const createSubAccount = (client, userId, data) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO user_bio (user_id, display_name) VALUES ($1, $2)";
        client.query(sqlQuery, [userId, data], (error, result) => {
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
        const sqlQuery = "UPDATE users SET password = $1, token = NULL, token_expired = NULL WHERE id = $2";
        const values = [newPassword, userId];
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

const forgotPass = (userId, otpCode) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "UPDATE users SET code_otp = $1, otp_expired_at = NOW() + INTERVAL '2 minutes' WHERE id = $2 RETURNING id, email, phone, code_otp, otp_expired_at";
        db.query(sqlQuery, [otpCode, userId], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const getUserbyForgot = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM users WHERE email = $1 AND code_otp = $2 AND otp_expired_at > NOW()";
        const values = [body.email, body.code_otp];
        db.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const editUserBio = (req) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "UPDATE user_bio SET ";
        let values = [];
        let i = 1;
        for(const [key, val] of Object.entries(req.body)) {
            sqlQuery += `${key} = $${i}, `;
            values.push(val);
            i++;
        }
        if(req.file) {
            const fileLink = `/images/users/${req.file.filename}`;
            sqlQuery += `profile_picture = '${fileLink}', `;
        }
        sqlQuery = sqlQuery.slice(0,-2);
        sqlQuery += ` WHERE user_id = $${i} RETURNING *`;
        values.push(req.authInfo.id);
        console.log(values);
        db.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const createToken = (userId, expIn, token) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE users SET token = $1, token_expired = NOW() + INTERVAL '${expIn} minutes' WHERE id = $2`;
        const values = [token, userId];
        console.log(values);
        db.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};
const compareToken = (userId, token) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM users WHERE id = $1 AND token = $2 AND token_expired > NOW()";
        const values = [userId, token];
        db.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

const logout = (userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "UPDATE users SET token = NULL, token_expired = NULL WHERE id = $1";
        const values = [userId];
        db.query(sqlQuery, values, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
};

// const getUser = (client, userId) => {
//     return new Promise((resolve, reject) => {
//         const sqlQuery = "SELECT * FROM users u JOIN user_bio ub ON ub.user_id = u.id WHERE id = $1";
//         client.query(sqlQuery, [userId], (error, result) => {
//             if(error) return reject(error);
//             resolve(result);
//         });
//     });
// };

module.exports = {
    userVerification,
    createAccount,
    createSubAccount,
    getAccount,
    getPassword,
    editPassword,
    forgotPass,
    getUserbyForgot,
    editUserBio,
    createToken,
    compareToken,
    logout,
    // getUser,
};