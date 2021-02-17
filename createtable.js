const express = require('express');
const app = express();
const Excel = require('exceljs');
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
    insecureAuth : true
});

    connection.getConnection((err)=>{
        if(err) {
            throw err;
        }
        console.log("Connected!");
        const sql = "CREATE TABLE records (id INT AUTO_INCREMENT PRIMARY KEY, Regno VARCHAR(255) NOT NULL, session VARCHAR(255) NOT NULL, semester INT NOT NULL, Semester_type VARCHAR(255) NOT NULL, Programme VARCHAR(255) NOT NULL, Branch VARCHAR(255) NOT NULL, SPI INT NOT NULL, P_CPI INT NOT NULL, CPI INT NOT NULL, Result VARCHAR(255) NOT NULL)";
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            console.log("Table created!");
        });
    }) 


app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
});