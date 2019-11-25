const express = require('express');
const { Client } = require('pg');
//const cors = require('cors');
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

app.get('/table/:tablename', async function(req,res){
    var tablename = req.params.tablename;
    var query = 'select * from ' + tablename;
    
    client.query(query, function (err, result) {
        
        if (err) {
            res.status(400).send(err);
        }
        
        var rows = result.rows;
        var fields = result.fields;
        res.writeHead(200, {'Content-Type': 'text/html'});
        var content = "<style>table {border-collapse: collapse;width: 100%;}th, td {text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #f2f2f2;}th {background-color: #4CAF50;color: white;}</style><body>";
        if(rows.length > 0){
            var tableContent = "<table>";
            tableContent = tableContent + "<tr>";
            for(let field of fields){
                tableContent = tableContent + "<th>" + field.name + "</th>";
            }

            tableContent = tableContent + "</tr>";
            for(let rowId in rows){
                tableContent = tableContent + "<tr>";
                for(let field of fields){
                    tableContent = tableContent + "<td>" + rows[rowId][field.name] + "</td>";
                }
                tableContent = tableContent + "</tr>";
            }
            tableContent = tableContent + "</table>";
            content = content + tableContent;
        }else{
            var noContent = "<h4>no content in table</h4>"
            content = content + noContent;
        }
        content = content + "</body>";
        res.status(200).end(content);
    });
});

app.listen(8080, function () {
    console.log('Server is running.. on Port 8080');
});
