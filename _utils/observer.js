/* eslint-disable no-unused-vars */
const airlabsService = require('../airlabsApi');
/**
 * Observer Class
 */
class Observer {
  /**
     * update
     * @param {*} event Function
     */
  update(event) {
    if (this.eventIsRelevant(event)) {
      this.reactToEvent(event);
    }
  }

  /**
   * eventIsRelevant
   */
  eventIsRelevant() {
    throw new Error('This needs to be implemented');
  }


  /**
   * reactToEvent
   */
  reactToEvent() {
    throw new Error('This needs to be implemented');
  }
}

/**
 * SyncFlights Class
 */
class SyncFlights extends Observer {
  /**
     * constructor
     */
  constructor() {
    super();
  }

  /**
 * eventIsRelevant
 * @param {*} evnt
 * @return {eventRelevance}
 */
  eventIsRelevant(evnt) {
    return (evnt.evntName == 'fetchFlights');
  }

  /**
   * reactToEvent
   * @param {*} evnt Event
   */
  async reactToEvent(evnt) {
    console.log('----------------------');
    console.log('Fetching!');
    airlabsService.fetchFlightsData().then((res)=>{
      console.log('Fetched', res);
    }).catch((err)=>{
      console.log('Error in Sync', err);
    });

    airlabsService.fetchAirports().then((res)=>{
      console.log('Airports Fetched', res);
    }).catch((err)=>{
      console.log('Error in Sync', err);
    });

    airlabsService.fetchAirlines().then((res)=>{
      console.log('Airlines Fetched', res);
    }).catch((err)=>{
      console.log('Error in Sync', err);
    });
  }
}


module.exports = SyncFlights;
