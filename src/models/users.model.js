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

        const pick = "u.id, email, password, phone, ub.display_name, ub.first_name, ub.last_name, ub.address, ub.birth_date, ub.gender, ur.role_name, profile_picture";
        const table = "users u JOIN user_role ur ON u.role_id = ur.id JOIN user_bio ub ON ub.user_id = u.id";
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
        // const addData = "INSERT INTO users (email, password, phone) VALUES($1, $2, $3) RETURNING *";
        const addData = "WITH inserted_user AS (INSERT INTO users (email, password, phone) VALUES($1, $2, $3) RETURNING *), inserted_user_bio AS (INSERT INTO user_bio (display_name) VALUES ('$1') RETURNING *) SELECT * FROM inserted_user, inserted_user_bio";
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
        const editData = "UPDATE user_bio SET display_name = $1, first_name = $2, last_name = $3, address = $4, birth_date = $5, gender = $6, profile_picture = $7 WHERE user_id = $8 RETURNING *";
        const values = [data.display_name, data.first_name, data.last_name, data.address, data.birth_date, data.gender, data.profile_picture, data.id];
        db.query(editData, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const deleteUser = (info) => {
    return new Promise((resolve, reject) => {
        const values = [info.userId];
        const delData = "DELETE FROM users WHERE id = $1 OR id in (SELECT user_id FROM user_bio WHERE user_id = $1)";
        // const delData = "DELETE FROM users WHERE id = $1";
        db.query(delData, values, (error, result) => {
            if (error) {
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
    deleteUser,
}