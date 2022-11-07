const express = require('express');
// const dbConnection = require('./dbConnection');
// const airlab = require('./airlabsApi');
const Logger = require('./logger');
const app = express();
const port = 3000;


const syslog = new Logger().getInstance();

// Server
app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
});


app.get('/', syslog.log, (req, res)=>{
  res.send('Hello App Flight Project');
});
