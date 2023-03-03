const db = require("../configs/postgre");

const getUsers = () => {
    // const pick = "u.id, email, ur.role_name";
    // const table = "users u join user_role ur on u.role_id=ur.id order by id asc limit 10";
    return new Promise((resolve, reject) => {
        const showData = "SELECT id, email, password FROM users ORDER BY id ASC";
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
}


module.exports = {
    getUsers,
    getUserDetails,
}