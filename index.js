/* eslint-disable linebreak-style */
const express = require('express');
// const dbConnection = require('./dbConnection');
const Logger = require('./logger');
const app = express();
const cors = require('cors');
const port = 3000;
const syslog = new Logger().getInstance();
const errorHandler = require('./middleware/errorHandler');
const userController = require('./controller/user-controller');
const airlabsController = require('./controller/airlabs-controller');
const bodyParser = require('body-parser');
const subject = require('./services/subject');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// api routes
app.use(errorHandler);
app.use(syslog.apiLogger);
app.use('/users', userController);
app.use('/flights', airlabsController);

subject.init();
subject.on('start', () => console.log('start'));
subject.on('error', () => console.log('error'));
subject.on('end', () => console.log('end'));

// Server
app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
});
