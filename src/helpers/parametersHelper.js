class ParametersDecoders {
    /// Decode params and format a command based on it
    /// The passed object should be as followed
    /* 
        {
            host:'google.com',
            packetsNu:5,
            packetSize:56,
            ttl:44,
            timeOut:2000,

        } 
    */
    static decodBuildPingParams = (data) => {
        let _command = 'ping';
        if (data.packetsNu) {
            _command += ` -c ${data.packetsNu}`;
        }
        if (data.packetSize) {
            _command += ` -s ${data.packetSize}`;
        }
        if (data.ttl) {
            _command += ` -t ${data.ttl}`;
        }
        if (data.timeOut) {
            _command += ` -W ${data.timeOut}`
        }

        if (data.host) {
            _command += ` ${data.host}`;
        }
        return _command;
    }

    static extractParams = (data) => ({
        packetsNu: parseInt(data.packetsNu),
        host: data.host,
        packetSize: parseInt(data.packetSize),
        ttl: parseInt(data.ttl),
        timeOut: parseInt(data.timeOut)
    })
}

module.exports = {
    ParametersDecoders
}