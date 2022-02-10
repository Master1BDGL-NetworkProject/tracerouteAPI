const { getParisTraceInfoController } = require('../controllers/tracerouteController');
const tracerouteRouter = require('express').Router();

tracerouteRouter.get('/traceroute', getParisTraceInfoController);

module.exports = {
    tracerouteRouter
}