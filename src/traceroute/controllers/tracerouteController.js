const { execAsync } = require('../../helpers/commonHelpers');
const { TracerouteDecodersHelper } = require('../../helpers/tracerouteDecodersHelper');
const { ParametersDecoders } = require('../../helpers/parametersHelper');
//TODO 

const _decodeOutPut = (stdout, res) => {
    const _data = TracerouteDecodersHelper.decodeLinuxInetUtilsTracerouteOutput(stdout);
    console.log(_data);
    res.json({
        status: 200,
        data: _data
    });
}

const getParisTraceInfoController = async (req, res) => {
    let _params = ParametersDecoders.extractTracerouteParams(req.query);

    //Validate params 
    let { errors, isValid } = ParametersDecoders.validateTracerouteParams(_params)

    if (isValid) {
        let _command = ParametersDecoders.decodBuildInetUtilsTracerouteCommand(_params);
        console.log(_command)
        try {
            let { stderr, stdout } = await execAsync(_command);
            if (!stderr) {
                _decodeOutPut(stdout, res)
            }
            else {
                res.json({ status: 501, data: 'An error occured' })
            }
        } catch (error) {
            if (error.stdout && error.stdout != '') {
                /// We can paste the output
                const { stdout } = error;
                _decodeOutPut(stdout, res)
                return;
            }
            res.json({ status: 501, data: 'An error occured' })
        }
    }
    else {
        res.status(400).json({ status: 400, data: errors })
    }
}



module.exports = {
    getParisTraceInfoController
}