// const express = reuire("express");

import express from "express";

const app = express();
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
    console.log('welcome');
});