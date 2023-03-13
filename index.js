require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const { serverPort } = require("./src/configs/environment")
const PORT = serverPort || 8080;

app.use(morgan("dev"));
// app.use(morgan(":method :url :res[content-length] - :response-time ms"));
app.use(cors());

//parser for body
app.use(express.urlencoded({ extended: true })); //form-url_encode (if obj in obj 'true')
app.use(express.json()); //raw json

app.use(express.static("public"));

const masterRouter = require("./src/routers");
app.use(masterRouter);


app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
});