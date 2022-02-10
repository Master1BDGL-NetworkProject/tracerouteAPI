const express = require('express');
const { pingRouter } = require('./ping/routes/pingRouter');
const { tracerouteRouter } = require('./traceroute/routes/tracerouteRouter');

const app = express();

app.use(pingRouter);
app.use(tracerouteRouter);

app.listen(8080, () => console.log('Server is running 🔥🔥'))