const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dest = "";
        if(req.baseUrl === "/products") {
            dest = "./public/images/products";
        } else {
            dest = "./public/images/users";
        }
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        let filename = "";
        if(req.baseUrl === "/products"){
            filename = `product-${Date.now()}${path.extname(file.originalname)}`;
        } else {
            filename = `user-${Date.now()}${path.extname(file.originalname)}`;
        }

        cb(null, filename);
    },
});

const limits = 2e6;

const fileFilter = (req, file, cb) => {
    const pattern = /jpg|png|webp/i;
    const ext = path.extname(file.originalname);
    if(!pattern.test(ext)) return cb(null, false);
    cb(null, true);
};

const upload = multer({
    storage, limits, fileFilter,
});

module.exports = {
    singleUpload: (fieldName) => upload.single(fieldName),
    multiUpload: (fieldName, maxCount) => upload.array(fieldName, maxCount),
    multiFieldName: (fieldList) => upload.fields(fieldList),
};