const {Pool} = require("pg");

const db = new Pool({
    host: "localhost",
    database: "coffee_shop",
    // port,
    user: "afif",
    password: "kuff",
});

module.exports = db;