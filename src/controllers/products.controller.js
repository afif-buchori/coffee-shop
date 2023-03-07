const productsModel = require("../models/products.model");

const getProducts = async (req, res) => {
    try {
        const { query } = req;
        const result = await productsModel.getProducts(query);
        if(result.rows.length === 0) {
            res.status(404).json({
                msg: "Data Not Found... please don't do it again",
            });
            return;
        }
        res.status(200).json({
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Interna Server Error...",
        });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { params } = req;
        const result = await productsModel.getProductDetails(params);
        if(result.rows.length === 0) {
            res.status(404).json({
                msg: `Data ID ${params.productId} Not Found... please try other id`,
            });
            return;
        }
        res.status(200).json({
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Interna Server Error...",
        });
    }
};

const addProducts = async (req, res) => {
    try {
        const { body } = req;
        const result = await productsModel.addProducts(body);
        res.status(201).json({
            msg: "Add Data Success...",
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Interna Server Error...",
            data: err.detail,
        });
    }
};

const editProducts = async (req, res) => {
    try {
        const { params, body } = req;
        const result = await productsModel.editProducts(params, body);
        if(result.rowCount === 0) {
            res.status(404).json({
                msg: `Edit Fail... ID ${params.productId} Not Found...`,
            });
            return;
        }
        res.status(200).json({
            msg: "Edit Data Success...",
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error...",
            data: err.detail,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { params } = req;
        const result = await productsModel.deleteProduct(params);
        if(result.rowCount === 0) {
            res.status(404).json({
                msg: `Delete Fail... ID ${params.deleteId} Not Found...`,
            });
            return;
        }
        res.status(200).json({
            msg: `Delete Data ID ${params.deleteId} Success...`,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error...",
        });
    }
};

module.exports = {
    getProducts,
    getProductDetails,
    addProducts,
    editProducts,
    deleteProduct,
};