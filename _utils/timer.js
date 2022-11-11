const Subject = require('./subject');


/**
 * ETimer
 */
class ETimer extends Subject {
  /**
   * Constructor
   * @param {*} time
   */
  constructor(time) {
    super();
    this.interval = time;
  }


  /**
  * Run function
  * @param {*} interval Interval
  */
  run(interval) {
    setInterval(()=>{
      this.notifyObservers({
        evntName: 'fetchFlights',
      });
    }, interval);
  }
};


module.exports = ETimer;

