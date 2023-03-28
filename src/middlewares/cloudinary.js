// const cloudinary = require("../configs/cloudinary");
// const path = require("path");
// const dataUriParser = require("datauri/parser");

// const uploader = (prefix) => async (req, res, next) => {
//   const { file } = req;
//   if(!file) return next();

//   const buffer = file.buffer;
//   const ext = path.extname(file.originalname).toString();

//   const parser = new dataUriParser();
//   const datauri = parser.format(ext, buffer);
//   const filename = `${prefix}-${file.filename}-${id}`;

//   try {

//     const result = await cloudinary.uploader.upload();
//   }catch(err) {

//   }
// };

// module.exports = { uploader };