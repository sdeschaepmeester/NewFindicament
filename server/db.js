const mysql = require("mysql")

// need to change sql info in a .env
const pool = mysql.createConnection({
    connectionLimit: 10,
    password : "findicament2021",
    user: "findicament1",
    database: "findicament",
    host: "findicament.c94ph9ynptas.eu-west-3.rds.amazonaws.com",
    port : "3306"
})

module.exports = pool