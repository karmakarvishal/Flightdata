const Logger = require('../logger');
const syslog = new Logger().getInstance();

module.exports = errorHandler;

/**
 * errorHandler
 * @param {*} err Error Message
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {res} Status Response to the Caller
 */
function errorHandler(err, req, res, next) {
  syslog.log(err); // Logs to logs.txt
  switch (true) {
    case typeof err === 'string':
      // custom application error
      const is404 = err.toLowerCase().endsWith('not found');
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({message: err});
    default:
      return res.status(500).json({message: err.message});
  }
}
