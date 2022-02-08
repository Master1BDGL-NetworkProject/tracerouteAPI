const tracerouteRouter = require('express').Router();

tracerouteRouter.get('/traceroute', (req, res) => {
    res.send('Traceroute endpoint')
});

module.exports = {
    tracerouteRouter
}