class ParametersDecoders {
    /// Decode params and format a command based on it
    /// The passed object should be as follow
    /* 
        {
            host:'google.com',
            packetsNu:5,
            packetSize:56,
            ttl:44,
            timeOut:2000,

        } 
    */

    static decodBuildParisTracerouteParams = (data) => {
        let _command = 'paris-traceroute';
        if (data.hopsMaxNumber) {
            _command += ` --max-hops=${data.hopsMaxNumber}`;
        }
        if (data.timeOut) {
            _command += ` --wait=${data.timeOut}`;
        }
        if (data.protocol) {
            _command += ` --protocol=${data.protocol}`;
        }
        if (data.host) {
            _command += ` ${data.host}`;
        }
        return _command;
    }


    static decodBuildPingCommand = (data) => {
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

    static extractPingParams = (data) => ({
        packetsNu: parseInt(data.packetsNu),
        host: data.host,
        packetSize: parseInt(data.packetSize),
        ttl: parseInt(data.ttl),
        timeOut: parseInt(data.timeOut)
    })

    static extractTracerouteParams = (data) => ({
        host: data.host,
        hopsMaxNumber: data.hopsMaxNumber,
        timeOut: parseInt(data.timeOut),
        protocol: data.protocol /// either udp or icmp
    })
}

module.exports = {
    ParametersDecoders
}
