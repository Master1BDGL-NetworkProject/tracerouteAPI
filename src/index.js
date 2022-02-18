const express = require('express');
const { pingRouter } = require('./ping/routes/pingRouter');
const { tracerouteRouter } = require('./traceroute/routes/tracerouteRouter');
const { notFoundController } = require('../src/not_foud/notFound')

const cors = require('cors');

const app = express();

app.use(cors())
app.use(pingRouter)
app.use(tracerouteRouter)
app.use(notFoundController)

app.listen(process.env.PORT || 8080, () => console.log(`Server is running 🔥🔥 on port ${process.env.PORT || 8080}`))