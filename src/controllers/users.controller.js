const usersModel = require("../models/users.model");

const getUsers = async (req, res) => {
    try {
        const result = await usersModel.getUsers();
        res.status(200).json({
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    };
};

const getUserDetails = async (req, res) => {
    try {
        const { params } = req;
        const result = await usersModel.getUserDetails(params);
        res.status(200).json({
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    };
};

module.exports = {
    getUsers,
    getUserDetails,
};