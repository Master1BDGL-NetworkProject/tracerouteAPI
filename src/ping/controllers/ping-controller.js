const { execAsync, decodeWindowsPingOutput, formatPingInfoResponse } = require('../../helpers/helpers');

const getPingInfoController = async (req, res) => {
    // let { stderr, stdout } = await execAsync('ping google.com');
    const _data = formatPingInfoResponse();
    // if (!stderr) {
    //     console.log(stdout);
    //     // decodeWindowsPingOutput(stdout);
    // }
    res.json(_data);
    // res.json({ data: 'Hello there' })
}

module.exports = {
    getPingInfoController
}