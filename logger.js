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
            input: fs.createReadStream('./log.txt'),
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
        content = JSON.stringify(content) + '\r\n';
        fs.appendFile('log.txt', content, (err) => {
            if (err) {
                console.log('Error in logger:' + err);
            }
        });
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
