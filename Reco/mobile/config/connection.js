const mysql = require('mysql2');

// connection configurations
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'reco123@',
    database: 'reco'
});
module.exports = con;