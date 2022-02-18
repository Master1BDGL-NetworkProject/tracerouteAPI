const path = require('path')
const { PythonShell } = require('python-shell');
const { promisify } = require('util');

class CommandTrigger {

    static getScriptsPath() {
        return path.join(process.cwd(), 'py-src', 'src');
    }

    /**
     * Trigger ping from python script 'ping.py'
     */
    static triggerPing(params, callBack) {
        const options = this.buildOptions(params)
        PythonShell.run(this.getPathForScript('ping'), options, callBack)
    }

    static buildOptions(params) {
        return {
            args: [
                `-host=${params.host}`,
                `-packetsNu=${params.packetsNu}`,
                `-packetSize=${params.packetSize}`,
                `-ttl=${params.ttl}`,
                `-timeOut=${params.timeOut}`
            ]
        }
    }


    /**
     * 
     * @param type - type of request either [ping] or [traceroute]
     */
    static getPathForScript(type) {
        switch (type) {
            case 'ping':
                return path.join(this.getScriptsPath(), 'ping', 'ping.py');

            case 'traceroute':
                return path.join(this.getPathForScript('traceroute'), 'traceroute', 'traceroute.py');
        }
    }
}

module.exports = {
    CommandTrigger
}