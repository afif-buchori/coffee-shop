const productsModel = require("../models/products.model");

const getProducts = async (req, res) => {
    try {
        const { query } = req;
        const result = await productsModel.getProducts(query);
        res.status(200).json({
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Interna Server Error",
        });
    };
};

const getProductDetails = async (req, res) => {
    try {
        const { params } = req;
        const result = await productsModel.getProductDetails(params);
        res.status(200).json({
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Interna Server Error",
        });
    };
};

const addProducts = async (req, res) => {
    try {
        const { body } = req;
        const result = await productsModel.addProducts(body);
        res.status(201).json({
            data: result.rows,
            msg: "Add Data Success"
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Interna Server Error",
        });
    };
};

const editProducts = async (req, res) => {
    try {
        const { body } = req;
        const result = await productsModel.editProducts(body);
        res.status(201).json({
            data: result.rows,
            msg: "Add Data Success"
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    };
};

const deleteProduct = async (req, res) => {
    try {
        const { params } = req;
        const result = await productsModel.deleteProduct(params);
        res.status(201).json({
            msg: "DELETE data Success",
            data: result.rows,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    };
};

const showProdImage = async (req, res) => {
    try {
        const { params } = req;
        const result = await productsModel.showProdImage(params);
        res.status(200).static('E:/PICTURE/IMG_0385.JPG');
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Interna Server Error",
        });
    };
};

module.exports = {
    getProducts,
    getProductDetails,
    addProducts,
    editProducts,
    deleteProduct,
    showProdImage,
};