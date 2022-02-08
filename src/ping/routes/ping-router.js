const pingRouter = require('express').Router();
const { getPingInfoController } = require('../controllers/ping-controller');

pingRouter.get('/ping', getPingInfoController);

module.exports = {
    pingRouter
}