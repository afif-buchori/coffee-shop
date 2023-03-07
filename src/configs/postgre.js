const {Pool} = require("pg");

const env = require("./environment");

const db = new Pool({
    host: env.host,
    database: env.db,
    user: env.user,
    password: env.pwd,
});

module.exports = db;