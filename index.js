const express = require('express')
const dbConnection = require('./dbConnection')
const airlab = require('./airlabsApi')
const logger = require('./logger')
const app = express()
const port = 3000


const syslog = new logger().getInstance();

let createTb = `CREATE table temp (
                              id int primary key auto_increment,
                              hex varchar(255)not null
                          )`;


dbConnection.query(createTb,(err,res,fields)=>{
    syslog.log(res);
})

//Server 
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})



app.get('/',syslog.log,(req,res)=>{
    res.send("Hello App Flight Project");
})