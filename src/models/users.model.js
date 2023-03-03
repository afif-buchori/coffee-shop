const db = require("../configs/postgre");

const getUsers = () => {
    return new Promise((resolve, reject) => {
        const showData = "SELECT id, email, password, phone FROM users ORDER BY id ASC";
        db.query(showData, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const getUserDetails = (info) => {
    return new Promise((resolve, reject) => {

        const pick = "u.id, email, password, phone, display_name, first_name, Last_name, address, birth_date, gender, ur.role_name, profile_picture";
        const table = "users u JOIN user_role ur ON u.role_id = ur.id";
        const showData = `SELECT ${pick} FROM ${table} WHERE u.id = $1`;
        const values = [info.userId];
        db.query(showData, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const addUsers = (data) => {
    return new Promise((resolve, reject) => {
        const addData = "INSERT INTO users (email, password, phone) VALUES($1, $2, $3) RETURNING *";
        const values = [data.email, data.password, data.phone];
        db.query(addData, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const editUser = (data) => {
    return new Promise((resolve, reject) => {
        const editData = "UPDATE users SET email = $1, password = $2, phone = $3, display_name = $4, first_name = $5, last_name = $6, address = $7, birth_date = $8, gender = $9, profile_picture = $10 WHERE id = $11 RETURNING *";
        const values = [data.email, data.password, data.phone, data.display_name, data.first_name, data.last_name, data.address, data.birth_date, data.gender, data.profile_picture, data.id];
        db.query(editData, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};


module.exports = {
    getUsers,
    getUserDetails,
    addUsers,
    editUser,
}