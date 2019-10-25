const express = require('express');
const { Client } = require('pg');
//const DB_HOST = process.env.POSTGRES_SERVICE_HOST
//const DB_PORT = process.env.POSTGRES_SERVICE_PORT
const DB_HOST = process.env.POSTGRES_HOST
//const DB_PORT = process.env.POSTGRES_PORT
const POSTGRES_DB = process.env.POSTGRES_DB
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const connectionString = 'postgres://'+ POSTGRES_USER + ':'+ POSTGRES_PASSWORD + '@'+ DB_HOST +'/'+ POSTGRES_DB;
console.log("Connection " , connectionString);
const client = new Client({
    connectionString: connectionString
});
console.log("before connection");
client.connect();
console.log("connected...");
var app = express();
app.set('port', process.env.PORT || 8080);
app.get('/', function (req, res, next) {
    client.query('SELECT * FROM "pg-table"', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});
app.listen(8080, function () {
    console.log('Server is running.. on Port 8080');
});
