/* eslint-disable linebreak-style */
const express = require('express');
// const dbConnection = require('./dbConnection');
const Logger = require('./logger');
const app = express();
const cors = require('cors');
const syslog = new Logger().getInstance();
const errorHandler = require('./middleware/errorHandler');
const userController = require('./controller/user-controller');
const airlabsController = require('./controller/airlabs-controller');
const bodyParser = require('body-parser');
const ETimer = require('./_utils/timer');
const SyncFlights = require('./_utils/observer');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// api routes
app.use(errorHandler);
app.use(syslog.apiLogger);
app.use('/users', userController);
app.use('/flights', airlabsController);


const time = new ETimer();
time.addObserver(new SyncFlights());
const intrvl = process.env.INTERVAL;
time.run(intrvl);

// Server
app.listen(process.env.PORT, ()=>{
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
