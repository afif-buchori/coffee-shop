const express = require("express");

const app = express();
const PORT = 8080;

//parser for body
app.use(express.urlencoded({ extended: false })); //form-url_encode (if obj in obj 'true')
app.use(express.json()); //raw json

const masterRouter = require("./src/routers");
app.use(masterRouter);

app.use('/images', express.static('E:/PICTURE/IMG_0385.JPG'));

app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
});