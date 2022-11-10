/* eslint-disable linebreak-style */
/* eslint-disable indent */

const fs = require('fs');
const readLine = require('readline');
/**
 * Class Logger
 */
class Logger {
    /**
       * constructor
      */
    constructor() {
        this.lineCount = 0;
    }
    /**
     * count
     * @return {lineCount}
     */
    count() {
        const rline = readLine.createInterface({
            input: fs.createReadStream('./log.json'),
            output: process.stdout,
            terminal: false,
        });

        rline.on('line', () => {
            this.lineCount++;
        });

        rline.on('close', () => {
            console.log(this.lineCount);
        });

        return this.lineCount;
    }


    /**
     * log
     * @param {*} message message passed will be logged in the log.txt
     */
    log(message) {
        const timestamp = new Date().toISOString();
        let content = {message, timestamp};
        content = JSON.stringify(content, replacerFunc()) + '\r\n';
        fs.appendFile('log.json', content, (err) => {
            if (err) {
                console.log('Error in logger:' + err);
            }
        });
    }

    /**
     * API Logger
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    apiLogger(req, res, next) {
        const timestamp = new Date().toISOString();
        let content = {timestamp, req};
        content = JSON.stringify(content, replacerFunc()) + '\r\n';
        fs.appendFile('logAPI.json', content, (err) => {
            if (err) {
                console.log('Error in logger:' + err);
            }
        });
        next();
    }
}


module.exports = class Singleton {
    /**
     * constructor
     */
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Logger();
        }
    }

    /**
     * getInstance
     * @return {Singleton.instance} returns the single instance of logger class
     */
    getInstance() {
        return Singleton.instance;
    }
};

/**
     * replacerFunc - Converts Circular JSON to readable format.
     * @return {Object}
     */
 function replacerFunc() {
    const visited = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
      }
      return value;
    };
  };

