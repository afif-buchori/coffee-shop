const express = require("express");

const app = express();
const PORT = 8080;

const masterRouter = require("./src/routers");
app.use(masterRouter);

app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
    console.log('welcome');
});