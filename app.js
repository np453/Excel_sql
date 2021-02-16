const express = require('express');
const app = express();
const Excel = require('exceljs');
const path = require('path');
const mysql = require('mysql');


//PORT
const PORT= 6565;

const wb = new Excel.Workbook();
const filepath = path.resolve(__dirname,'Sample_file.xlsx');

var connection = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'naman0179',
    insecureAuth : true,
    database: 'mydb'
});

// connection.getConnection((err)=>{
//     if(err) {
//         throw err;
//     }
//     console.log("Connected!");
//     const sql = "CREATE TABLE records (id INT AUTO_INCREMENT PRIMARY KEY, Regno VARCHAR(255) NOT NULL, session VARCHAR(255) NOT NULL, semester INT NOT NULL, Semester_type VARCHAR(255) NOT NULL, Programme VARCHAR(255) NOT NULL, Branch VARCHAR(255) NOT NULL, SPI INT NOT NULL, P_CPI INT NOT NULL, CPI INT NOT NULL, Result VARCHAR(255) NOT NULL)";
//     connection.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log("Table created!");
//     });
//  })   
    // connection.getConnection((err)=>{
    //     if(err) {
    //         throw err;
    //     }
    //     console.log("Connected!");
    //     const sql = "CREATE TABLE records (id INT AUTO_INCREMENT PRIMARY KEY, Regno VARCHAR(255) NOT NULL, session VARCHAR(255) NOT NULL, semester INT NOT NULL, Semester_type VARCHAR(255) NOT NULL, Programme VARCHAR(255) NOT NULL, Branch VARCHAR(255) NOT NULL, SPI INT NOT NULL, P_CPI INT NOT NULL, CPI INT NOT NULL, Result VARCHAR(255) NOT NULL)";
    //     connection.query(sql,(err,result)=>{
    //         if(err) throw err;
    //         console.log("Table created!");
    //     });
    // })
    


const subject_code = ["PTSW","DN","BM","BT","CL","EN","GE","ST","CM","CC","CS","EE","PE","EM","FE","GI","IS","MT","PR","TR","VL","PS","PD","TH","SP","SW"];
const subject_array= [];
subject_array["PTSW"]="Software Engineering (Part Time)";
subject_array["DN"]="Mechanical Engineering (Design Engineering)";
subject_array["BM"]="Biomedical Engineering";        
subject_array["BT"]="Biotechnology";
subject_array["CL"]="Chemical Engineering";
subject_array["EN"]="Civil Engineering (Environmental Engineering)";
subject_array["GE"]="Civil Engineering (Geotechnical Engineering)";
subject_array["ST"]="Civil Engineering (Structural Engineering)";
subject_array["CM"]="Communication System";
subject_array["CC"]="Computer Aided Design and Manufacturing";
subject_array["CS"]="Computer Science and Engineering";
subject_array["EE"]="Electrical Engineering (Control and Instrumentation)";
subject_array["PE"]="Electrical Engineering (Power Electronics and Drives)";
subject_array["EM"]="Engineering Mechanics and Design";
subject_array["FE"]="Fluids Engineering";
subject_array["GI"]="Geoinformatics";
subject_array["IS"]="Information Security";
subject_array["MT"]="Material Science and Engineering";
subject_array["PR"]="Mechanical Engineering(Production Engineering)";
subject_array["TR"]="Transportation Engineering";
subject_array["VL"]="Microelectronics and VLSI Design";
subject_array["PS"]="Power System";
subject_array["PD"]="Product Design and Development";
subject_array["TH"]="Thermal Engineering";
subject_array["SP"]="Signal Processing";
subject_array["SW"]="Software Engineering";



const d = new Date();
const current_year= d.getFullYear();
console.log(current_year);
wb.xlsx.readFile(filepath).then(()=>{
    const sheet = wb.getWorksheet("M.Tech.");//opening worksheet
    // console.log(sheet.actualRowCount);
    queryconnection= async (i)=>{
        await connection.getConnection((err,result)=>{
                            
            console.log("database connected!");
            console.log(i)
            var sql = `INSERT INTO records (Regno, session, semester, Semester_type, Programme, Branch, SPI, P_CPI, CPI, Result) VALUES ("${sheet.getRow(i).getCell(1).value}",${sheet.getRow(i).getCell(2).value},${sheet.getRow(i).getCell(3).value},"${sheet.getRow(i).getCell(4).value}","${sheet.getRow(i).getCell(5).value}", "${sheet.getRow(i).getCell(6).value.toString()}",${sheet.getRow(i).getCell(7).value},${sheet.getRow(i).getCell(8).value},${sheet.getRow(i).getCell(9).value},"${sheet.getRow(i).getCell(10).value}")`;
            result.query(sql, (err,result)=>{
                if(err) throw err;
                // result.release();
                console.log(`${i} data inserted!`);
            })
            
            if(err) console.log(err.stack);
        })
    }
    for(var i=2;i<=sheet.actualRowCount+1;i++){
        var temp = sheet.getRow(i).getCell(1).value;
        var year = temp.slice(0,4);
        console.log(year);
        if(year<=current_year){
            console.log("valid year");
            var branch_code = temp.slice(4,temp.length-2);
            if(subject_code.includes(branch_code)){
                console.log("valid branch");
                if(sheet.getRow(i).getCell(6).value == subject_array[branch_code]){
                    console.log("valid branch name");
                    queryconnection(i);
                    // connection.end();
                }
                else{
                    return console.log("Invalid Branch Name");
                }
            }
            else{
                return console.log("Invalid Registration Number");
            }
        }
        else{
            return console.log("Invalid Registration Number");
        }
        
    }
    // for(var i=0;i<=15;i++){
    //      connection.getConnection((err,result)=>{
    //          result.release();
    //          if (err) console.log(err.stack);
    //          console.log("it works!!!")
    //      })
    //     // connection.end();
    // }
})


app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
});