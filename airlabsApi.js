const request = require("request");
const db = require('./dbConnection');
const api_key = "07939fae-6a07-4c3e-8165-7fdc1b730a24";
const api_base = "https://airlabs.co/api/v9/";
const logger = require('./logger');
const syslog = new logger().getInstance();

function apiCall(method, params, cb) {
  params.api_key = api_key;
  request.post({url: `${api_base}${method}`, form: params}, cb);
}




