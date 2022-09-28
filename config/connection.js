const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Boostbelau1701',
        database: 'tracker'
    },
    console.log('Connected to the election database.')
);

db.connect((err) => {
    if (err) throw err;
});

module.exports = db;