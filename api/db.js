const mysql = require('mysql');
const process = require('process');

module.exports = function () {
    const database = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
    database.connect();
    return database;
};