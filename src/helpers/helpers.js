const { promisify } = require('util')
const { exec } = require('child_process');

const execAsync = promisify(exec);

/// Extract matches from stdout
const decodeWindowsPingOutput = (output) => {
    const pattern = /([0-9.]{2,3}.){4}: octets=[0-9]+ temps=[0-9]+ ms TTL=[0-9]+[\n\r\.*]/;
    console.log(output.trim().match(pattern));
}


/// Format PingInfo response for building a well defined structure to meet
const formatPingInfoResponse = () => ({
    data: [{
        host: 'google.com',
        time: 4400,
        ttl: 64,
        sequenceNo: 2,
        paquet: 52,
    }, {
        host: 'google.com',
        time: 4400,
        ttl: 64,
        sequenceNo: 2,
        paquet: 52,
    }, {
        host: 'google.com',
        time: 4400,
        ttl: 64,
        sequenceNo: 2,
        paquet: 52,
    }, {
        host: 'google.com',
        time: 4400,
        ttl: 64,
        sequenceNo: 2,
        paquet: 52,
    }, {
        host: 'google.com',
        time: 4400,
        ttl: 64,
        sequenceNo: 2,
        paquet: 52,
    }]
});



module.exports = {
    execAsync,
    decodeWindowsPingOutput,
    formatPingInfoResponse
}