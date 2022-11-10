/* eslint-disable linebreak-style */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const airlabsService = require('../airlabsApi');

router.post('/sync', syncData);
router.post('/track', flightData);
router.post('/info', flightInfo);
router.post('/delay', flightDelay);
router.post('/airports', getAirports);


/**
 * Sync Data
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next Function
 */
async function syncData(req, res, next) {
  try {
    airlabsService.syncData().then((result)=>{
      res.send({sync: 'Success'});
    });
  } catch (error) {
    res.send({sync: 'Failed'});
  }
}

/**
 * getAirports
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next Function
 */
async function getAirports(req, res, next) {
  try {
    airlabsService.getAirports().then((result)=>{
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
}

/**
 * flightInfo
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next Function
 */
async function flightInfo(req, res, next) {
  try {
    const params = {};
    params.flight_iata = req.body.iata_code;
    params.flight_icao = req.body.icao_code;
    airlabsService.apiCall(req.body.endpoint, params).then((result)=>{
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
}

/**
 * flightDelay
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next Function
 */
async function flightDelay(req, res, next) {
  try {
    const params = req.body;
    airlabsService.apiCall(req.body.endpoint, params).then((result)=>{
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
}


/**
 * flightData
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next Function
 */
async function flightData(req, res, next) {
  try {
    airlabsService.apiCall(req.body.endpoint).then((result)=>{
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
}

module.exports = router;
