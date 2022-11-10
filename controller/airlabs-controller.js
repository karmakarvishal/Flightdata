/* eslint-disable linebreak-style */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const airlabsService = require('../airlabsApi');

router.post('/sync', syncData);
router.post('/flights', flightData);


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
 * flightData
* @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next Function
 */
async function flightData(req, res, next) {
  try {
    airlabsService.apiCall(req.body.endpoint, req.body.params).then((result)=>{
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
}

