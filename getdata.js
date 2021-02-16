const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');


//PORT
const PORT= 6565;


var connection = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'naman0179',
    insecureAuth : true,
    database: 'mydb'
});

connection.getConnection((err)=>{
    if(err) {
        throw err;
    }
    console.log("Connected!");
    const sql = "SELECT * FROM records";
    connection.query(sql,(err,result,fields)=>{
        if(err) throw err;
        console.log(result);
    });
 })   






app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
});