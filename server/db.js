const mysql = require("mysql")

// need to change sql info in a .env
const pool = mysql.createPool({
    connectionLimit: 10,
    password : "",
    user: "root",
    database: "medica",
    host: "localhost",
    port : "3306"
})

module.exports = pool