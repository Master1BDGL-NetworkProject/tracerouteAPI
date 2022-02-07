const express = require('express');

const app = express();


app.use('/ping', (req, res) => {
    //TODO
    res.send('Ping endpoint')
});

app.use('/traceroute', (req, res) => {
    //TODO
    res.send('Traceroute endpoint')

});

app.listen(8080, () => console.log('Server is running 🔥🔥'))