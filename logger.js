const fs = require('fs');
const readLine = require('readline');




/**
 * 
 * @class Logger
 * TODO: Make it a singleton
 * Application of Singleton Desing pattern
 */
class Logger {

    
    constructor() {
        this.lineCount = 0;
     }

    count() {
        let rline = readLine.createInterface({
            input: fs.createReadStream('./log.txt'),
            output: process.stdout,
            terminal: false
        })

        rline.on('line', (line) => {
            this.lineCount++;
        })

        rline.on('close', () => {
            console.log(this.lineCount);
        })

        return this.lineCount;

    }

    log(message) {
        const timestamp = new Date().toISOString();
        let content = { message, timestamp };
        content = JSON.stringify(content)+ '\r\n';
        fs.appendFile('log.txt', content, (err) => {
            if (err)
                console.log('Error in logger:'+err);
        })
    }
}


module.exports = class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Logger();
        }
    }

    /**
 * * Returns the single instance of logger class.
 */
    getInstance(){
        return Singleton.instance;
    }
}