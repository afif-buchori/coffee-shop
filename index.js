// const express = reuire("express");

import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.json({
        msg: "Welcome Coffee Shop",
    });
});

app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
    console.log('welcome');
});