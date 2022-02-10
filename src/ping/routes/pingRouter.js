const pingRouter = require('express').Router();
const { getPingInfoController } = require('../controllers/pingController');

pingRouter.get('/ping', getPingInfoController);

module.exports = {
    pingRouter
}