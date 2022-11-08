/* eslint-disable linebreak-style */
const express = require('express');
// const dbConnection = require('./dbConnection');
// const airlab = require('./airlabsApi');
const Logger = require('./logger');
const app = express();
const cors = require('cors');
const port = 3000;
const syslog = new Logger().getInstance();
const errorHandler = require('./middleware/errorHandler');
const userController = require('./controller/user-controller');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// api routes
app.use(errorHandler);
app.use(syslog.apiLogger);
app.use('/users', userController);

// Server
app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
});
