const { PingDecodersHelper } = require('../../helpers/pingDecodersHelper');
const { ParametersDecoders } = require('../../helpers/parametersHelper');
const { CommandTrigger } = require('../../helpers/commandTrigger');

const getPingInfoController = async (req, res) => {
    let _params = ParametersDecoders.extractPingParams(req.query);
    /// CHeck required fields
    const { errors, isValid } = ParametersDecoders.validatePingParams(_params);
    if (isValid) {
        CommandTrigger.triggerPing(_params, (err, result) => {
            _decodeSendOut(err, result, res)
        })
    }
    else {
        res.status(400).json({ status: 400, data: errors })
    }
}

const _decodeSendOut = (err, result, res) => {
    if (!err) {
        const stdout = result.join(' ')
        const _data = PingDecodersHelper.decodeLinuxPingOutput(stdout);
        res.json({
            status: 200,
            data: _data
        });
    }
    else {
        res.status(501)
        res.json({ status: 501, data: 'An error occured' })
    }
}

module.exports = {
    getPingInfoController
}