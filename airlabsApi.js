const request = require('request');
// const db = require('./dbConnection');
const apiKey = '07939fae-6a07-4c3e-8165-7fdc1b730a24';
const apiBase = 'https://airlabs.co/api/v9/';
// const Logger = require('./logger');
// const sysLog = new Logger().getInstance();

/**
 * apiCall
 * @param {*} method like Post,Get,Put
 * @param {*} params {Objects}
 * @param {*} cb Callback Function
 */
function apiCall(method, params, cb) {
  params.api_key = apiKey;
  request.post({url: `${apiBase}${method}`, form: params}, cb);
}

apiCall();


