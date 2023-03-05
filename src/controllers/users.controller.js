const usersModel = require("../models/users.model");

const getUsers = async (req, res) => {
    try {
        const { query } = req;
        const result = await usersModel.getUsers(query);
        if(result.rows.length === 0) {
            res.status(404).json({
                msg: "Data Not Found...",
                data : result.rows,
            });
            return;
        }
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
        if(result.rows.length === 0) {
            res.status(404).json({
                msg: "Data Not Found... please try other id",
            });
            return;
        }
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

const addUsers = async (req, res) => {
    try {
        const { body } = req;
        const result = await usersModel.addUsers(body);
        res.status(201).json({
            msg: "Add Data User Success",
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error",
            data: err.detail,
        });
    };
};

const editUser = async (req, res) => {
    try {
        const { params, body } = req;
        const result = await usersModel.editUser(params, body);
        res.status(200).json({
            msg: "Update Data User Success",
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error",
            data: err.detail,
        });
    };
}

const deleteUser = async (req, res) => {
    try {
        const { params } = req;
        const result = await usersModel.deleteUser(params);
        res.status(200).json({
            msg: "Delete Data User Success",
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
    addUsers,
    editUser,
    deleteUser,
};