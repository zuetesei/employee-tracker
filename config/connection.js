const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Boostbelau1701',
        database: 'tracker'
    },

    console.log('Welcome to the Employee Tracker! You are now connected to the database.')
);

module.exports = db;