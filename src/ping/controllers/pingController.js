const { execAsync } = require('../../helpers/commonHelpers');
const { PingDecodersHelper } = require('../../helpers/pingDecodersHelper');
const { ParametersDecoders } = require('../../helpers/parametersHelper');

const getPingInfoController = async (req, res) => {
    let _params = ParametersDecoders.extractParams(req.query);
    let _command = ParametersDecoders.decodBuildPingParams(_params);

    let { stderr, stdout } = await execAsync(_command);
    if (!stderr) {
        const _data = PingDecodersHelper.decodeLinuxPingOutput(stdout);
        res.json({
            status: 200,
            data: _data
        });
    }
    else {
        res.json({ status: 501, data: 'An error occured' })
    }
}

module.exports = {
    getPingInfoController
}