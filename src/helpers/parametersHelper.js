const { json } = require("express/lib/response");

class ParametersDecoders {

    static getRequiredPingParametersName = () => {
        return ["host", "packetsNu", "packetSize", "ttl", "timeOut"].sort()
    }
    static getRequiredTracerouteParametersName = () => {
        return ["host", "hopsMaxNumber", "timeOut", "protocol"].sort()
    }

    static validatePingParams = (params) => {
        let errors, isValid = false;
        let _paramsNames = Object.keys(params)
        const requiredParams = this.getRequiredPingParametersName();
        _paramsNames = _paramsNames.sort()

        let _missedField = requiredParams.filter((_param) => !(_paramsNames.includes(_param) && (params[_param] != undefined)))
        if (_missedField.length != 0) {
            return {
                errors: `Please provide this fields : ${_missedField.join(',')}`,
                isValid: false
            }
        }
        else return { isValid: true, errors }
    }

    static validateTracerouteParams = (params) => {
        let errors, isValid = false;
        let _paramsNames = Object.keys(params)
        const requiredParams = this.getRequiredTracerouteParametersName();
        _paramsNames = _paramsNames.sort()

        let _missedField = requiredParams.filter((_param) => !(_paramsNames.includes(_param) && (params[_param] != undefined)))
        if (_missedField.length != 0) {
            return {
                errors: `Please provide this fields : ${_missedField.join(',')}`,
                isValid: false
            }
        }
        else return { isValid: true, errors }
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

    static decodBuildInetUtilsTracerouteCommand = (data) => {
        let _command = 'inetutils-traceroute';
        if (data.hopsMaxNumber) {
            _command += ` --max-hop=${data.hopsMaxNumber}`;
        }
        if (data.timeOut) {
            _command += ` --wait=${data.timeOut}`;
        }
        if (data.protocol) {
            _command += ` --type=${data.protocol}`;
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

    static extractPingParams = (data) => {
        return ({
            packetsNu: parseInt(data.packetsNu) || undefined,
            host: data.host || undefined,
            packetSize: parseInt(data.packetSize) || undefined,
            ttl: parseInt(data.ttl) || undefined,
            timeOut: parseInt(data.timeOut) || undefined
        })
    }

    static extractTracerouteParams = (data) => ({
        host: data.host || undefined,
        hopsMaxNumber: data.hopsMaxNumber || undefined,
        timeOut: parseInt(data.timeOut) || undefined,
        protocol: data.protocol || undefined /// either udp or icmp
    })
}

module.exports = {
    ParametersDecoders
}
