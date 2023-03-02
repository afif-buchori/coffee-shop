const express = require("express");

// import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    // res.json({
    //     msg: "Welcome Coffee Shop",
    // });
    const db = require("./src/configs/postgre");
    db.query("select u.id, email, ur.role_name from users u join user_role ur on u.role_id=ur.id", (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({
                msg: "Internal Server Error",
            });
            return;
        }
        console.log("Connection Database OK");
        res.status(200).json({
            data: result.rows,
        });
    });
});

app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
    console.log('welcome');
});