const { json } = require("express/lib/response");

class ParametersDecoders {

    static getRequiredPingParametersName = () => {
        return ["host", "packetsNu", "packetSize", "ttl", "timeOut"].sort()
    }

    static validateParams = (params) => {
        let errors, isValid = false;
        let _paramsNames = Object.keys(params)
        const requiredParams = this.getRequiredPingParametersName();
        _paramsNames = _paramsNames.sort()

        if (JSON.stringify(_paramsNames) == JSON.stringify(requiredParams)) {
            return { errors, isValid: true }
        }
        else {
            let _difference = requiredParams.filter((_param) => !_paramsNames.includes(_param))
            return {
                errors: `Please provide this fields : ${_difference.join(',')}`,
                isValid: false
            }
        }
    }
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
        [data.packetsNu]: parseInt(data.packetsNu),
        [data.host]: data.host,
        [data.packetSize]: parseInt(data.packetSize),
        [data.ttl]: parseInt(data.ttl),
        [data.timeOut]: parseInt(data.timeOut)
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
