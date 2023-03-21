module.exports = {
    host: process.env.DB_HOST,
    db: process.env.DATA_BASE,
    port: process.env.DB_PORT,
    user: process.env.DB_UNAME,
    pwd: process.env.DB_PWD,
    serverPort: process.env.SERVER_PORT,
    jwtSecret: process.env.JWT_SECRET,
    cloudinaryName : process.env.CLOUD_NAME,
    cloudinaryKey : process.env.CLOUD_KEY,
    cloudinarySecret: process.env.CLOUD_SECRET,
};