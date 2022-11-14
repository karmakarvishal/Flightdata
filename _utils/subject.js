/* eslint-disable linebreak-style */

/**
 * Subject which emits some event
 */
class Subject {
  /**
     * Constructor
     */
  constructor() {
    this.observers = [];
  }

  /**
   * addObserver
   * @param {*} obs Adds Observer
   */
  addObserver(obs) {
    this.observers.push(obs);
  }

  /**
   * notifyObservers
   * @param {*} event Notifies All
   */
  notifyObservers(event) {
    this.observers.forEach( (o) => o.update(event));
  }
}

module.exports = Subject;
