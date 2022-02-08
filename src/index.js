const express = require('express');
const { pingRouter } = require('./ping/routes/ping-router');
const { tracerouteRouter } = require('./traceroute/routes/traceroute_router');

const app = express();

app.use(pingRouter);
app.use(tracerouteRouter);

app.listen(8080, () => console.log('Server is running 🔥🔥'))