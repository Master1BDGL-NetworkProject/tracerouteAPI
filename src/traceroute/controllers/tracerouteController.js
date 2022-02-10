const { execAsync } = require('../../helpers/commonHelpers');
const { TracerouteDecodersHelper } = require('../../helpers/tracerouteDecodersHelper');
// const { ParametersDecoders } = require('../../helpers/parametersHelper');
//TODO 

const getPingInfoController = async (req, res) => {
    let _params = ParametersDecoders.extractParams(req.query);
    let _command = ParametersDecoders.decodBuildPingParams(_params);

    let { stderr, stdout } = await execAsync(_command);
    if (!stderr) {
        const _data = TracerouteDecodersHelper.decodeLinuxParisTracerouteOutput(stdout);
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