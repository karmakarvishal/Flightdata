const EventEmitter = require('events').EventEmitter;

/**
 * Subject
 */
class Subject extends EventEmitter {
  /**
     * Init
     * @param {*} arg Args
     */
  init() {
    this.emit('start');


    // more actions

    this.emit('end');
  }
}


module.exports = new Subject();
