const request = require('request');
const db = require('./dbConnection');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const apiBase = process.env.API_BASE;
const Logger = require('./logger');
const syslog = new Logger().getInstance();

/**
 * apiCall
 * @param {*} method Endpoints
 * @param {*} params Request Params
 * @param {*} _cb Callback Function
 */
async function apiCall(method, params={}, _cb) {
  return new Promise((resolve, reject)=>{
    try {
      params.api_key = apiKey;
      request.post({url: `${apiBase}${method}`,
        form: params}, function(_err, _httpResponse, body) {
        syslog.log(body);
        const responseData = JSON.parse(body).response;
        resolve(responseData);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * flightInfo
 * @param {*} method Endpoints
 * @param {*} params Request Params
 * @param {*} _cb Callback Function
 */
async function flightInfo(method, params={}, _cb) {
  return new Promise((resolve, reject)=>{
    try {
      params.api_key = apiKey;
      request.post({url: `${apiBase}${method}`,
        form: params}, function(_err, _httpResponse, body) {
        syslog.log(body);
        const responseData = JSON.parse(body).response;
        resolve(responseData);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * fetchFlightsData
 * @param {*} method API Endpoint
 * @param {*} params Req Parameters
 * @param {*} _cb Callback Function
 * @return {Promise}
 */
async function fetchFlightsData(method='flights', params={}, _cb) {
  return new Promise((resolve, reject)=>{
    try {
      params.api_key = apiKey;
      request.post({url: `${apiBase}${method}`,
        form: params}, function(_err, _httpResponse, body) {
        syslog.log(body);
        const responseData = JSON.parse(body).response;

        const sql = `INSERT INTO flightdb.flight_tracker
        (hex, reg_number, flag, lat, lng, alt, dir, speed, v_speed, 
          squawk, flight_number, flight_icao, flight_iata, dep_icao,
          dep_iata, arr_icao, arr_iata, airline_icao, 
          airline_iata, aircraft_icao, updated, status) VALUES ?;`;
        const values = [responseData.map((item) => [item.hex, item.reg_number,
          item.flag, item.lat, item.lng, item.alt, item.dir, item.speed,
          item.v_speed, item.squawk, item.flight_number, item.flight_icao,
          item.flight_iata, item.dep_icao,
          item.dep_iata, item.arr_icao, item.arr_iata, item.airline_icao,
          item.airline_iata, item.aircraft_icao, item.updated, item.status])];

        db.query(sql, values, (err, res, _fields)=>{
          if (err) {
            syslog.log(err);
          } else {
            syslog.log(res);
            resolve('Flight API fetched');
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}


/**
 * fetchAirlines
 * @param {*} method API Endpoint
 * @param {*} params Req Parameters
 * @param {*} _cb Callback Function
 * @return {Promise}
 */
async function fetchAirlines(method='airlines', params={}, _cb) {
  return new Promise((resolve, reject)=>{
    try {
      params.api_key = apiKey;
      request.post({url: `${apiBase}${method}`,
        form: params}, function(_err, _httpResponse, body) {
        syslog.log(body);
        const responseData = JSON.parse(body).response;

        const sql = `INSERT INTO flightdb.flight_airlines
        (name, iata_code, iata_prefix, iata_accounting, icao_code, callsign, 
          country_code,iosa_registered, is_scheduled, is_passenger,is_cargo, 
          is_international, total_aircrafts,average_fleet_age, 
          accidents_last_5y,crashes_last_5y, website, facebook,
          twitter, instagram,linkedin, slug)
         VALUES ?;`;
        const values = [responseData.map((item) => [item.name, item.iata_code,
          '', '', item.icao_code, '',
          '', '', '', '', '',
          '', '', '',
          '', '', '', '',
          '', '', '', ''])];

        db.query(sql, values, (err, res, _fields)=>{
          if (err) {
            syslog.log(err);
          } else {
            syslog.log(res);
            resolve('Airlines API fetched');
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}


/**
 * fetchAirports
 * @param {*} method API Endpoint
 * @param {*} params Req Parameters
 * @param {*} _cb Callback Function
 * @return {Promise}
 */
async function fetchAirports(method='airports', params={}, _cb) {
  return new Promise((resolve, reject)=>{
    try {
      params.api_key = apiKey;
      request.post({url: `${apiBase}${method}`,
        form: params}, function(_err, _httpResponse, body) {
        syslog.log(body);
        const responseData = JSON.parse(body).response;

        const sql = `INSERT INTO flightdb.flight_airport
        (name, iata_code, icao_code, lat, lng, city,
           city_code, un_locode, timezone, country_code)
         VALUES ?;`;
        const values = [responseData.map((item) => [item.name, item.iata_code,
          item.icao_code, item.lat, item.lng, item.city, item.city_code,
          item.un_locode, item.timezone, item.country_code])];

        db.query(sql, values, (err, res, _fields)=>{
          if (err) {
            syslog.log(err);
          } else {
            syslog.log(res);
            resolve('Airports API fetched');
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * get All Airports From DB
 * @param {*} method API Endpoint
 * @param {*} params Req Parameters
 * @param {*} _cb Callback Function
 * @return {Promise}
 */
async function getAirports() {
  return new Promise((resolve, reject)=>{
    try {
      const sql = `SELECT id, name, iata_code, icao_code, lat, lng, city, 
      city_code, un_locode, timezone, country_code
      FROM flightdb.flight_airport;`;


      db.query(sql, (err, res, _fields)=>{
        if (err) {
          syslog.log(err);
          reject(err);
        } else {
          syslog.log(res);
          resolve({airports: res});
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}


/**
 * Sync All API
 */
async function syncData() {
  return new Promise(async (resolve, reject)=>{
    try {
      await fetchAirlines();
      await fetchFlightsData();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  fetchAirlines,
  fetchFlightsData,
  fetchAirports,
  apiCall,
  syncData,
  flightInfo,
  getAirports,
};

