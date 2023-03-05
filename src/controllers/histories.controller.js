const historiesModel = require("../models/histories.model");

const getHistories = async (req, res) => {
    try {
        const { query } = req;
        const result = await historiesModel.getHistories(query);
        if(result.rows.length === 0) {
            res.status(404).json({
                msg: "Data Not Found...",
                data: result.rows,
            })
            return;
        }
        res.status(200).json({
            data: result.rows,
        });
    } catch (err) {
        res.status(500).json ({
            msg: "Internal Server Error",
        });
    };
};

const addHistory = async (req, res) => {
    try {
        const { body } = req;
        const result = await historiesModel.addHistory(body);
        res.status(201).json({
            msg: "Add Data History Success...",
            data: result.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error...",
            data: err.detail,
        });
    };
};

const editHistory =async (req, res) => {
    try {
        const { params, body } = req;
        const result = await historiesModel.editHistory(params, body);
        if(result.rowCount === 0) {
            res.status(404).json({
                msg: `Edit Fail... ID ${params.historyId} Not Found...`,
            });
            return;
        }
        res.status(200).json({
            msg: "Add Data History Success...",
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error...",
            data: err.detail,
        });
    };
};

const deleteHistory = async (req, res) => {
    try {
        const { params } = req;
        const result = await historiesModel.deleteHistory(params);
        if(result.rowCount === 0) {
            res.status(404).json({
                msg: `Delete Fail... ID ${params.historyId} Not Found...`,
            });
            return;
        }
        res.status(200).json({
            msg: `Delete Data History ID ${params.historyId} Success...`,
            data: result.rows,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error...",
            data: err.detail,
        });
    };
}

module.exports = {
    getHistories,
    addHistory,
    editHistory,
    deleteHistory,
};